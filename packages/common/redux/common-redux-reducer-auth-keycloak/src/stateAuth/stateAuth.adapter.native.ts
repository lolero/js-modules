import type { KeycloakServerConfig } from 'keycloak-js';
import type { AuthConfiguration } from 'react-native-app-auth';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import type { EventChannel } from 'redux-saga';
import { eventChannel } from 'redux-saga';
import {
  clearKeycloakTokens,
  createAuthConfiguration,
  createKeycloakTokens,
  getKeycloakTokens,
  isTokenExpired,
  storeKeycloakTokens,
  TOKEN_REFRESH_BUFFER_SECONDS,
} from './stateAuth.adapter.native.utils';
import type {
  AuthAdapter,
  AuthInitResult,
  KeycloakTokens,
} from './stateAuth.types';

// TODO: pass a logger to this so it can document when the commented out
//  console errors should document said failures
/**
 * Native authentication adapter using react-native-app-auth
 * Implements OAuth Authorization Code + PKCE flow for mobile apps
 */
export class StateAuthAdapter implements AuthAdapter {
  private authConfiguration: AuthConfiguration;

  private isTokenValidChannel: EventChannel<boolean>;

  private isTokenValidEventEmitter: ((isTokenValid: boolean) => void) | null =
    null;

  private keycloakTokens: KeycloakTokens | null = null;

  private tokenRefreshTimeout: NodeJS.Timeout | null = null;

  private tokenRefreshPromise: Promise<KeycloakTokens | null> | null = null;

  constructor(config: KeycloakServerConfig) {
    this.authConfiguration = createAuthConfiguration(config);
    this.isTokenValidChannel = this.createIsTokenValidChannel();
  }

  /**
   * Refresh access token using refresh token
   * Uses promise queue to prevent concurrent refresh attempts
   * Returns null on failure, emits onAuthRefreshError event
   */
  private async refreshAccessToken(): Promise<KeycloakTokens | null> {
    // If already refreshing, wait for that promise
    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise;
    }

    // Start new refresh
    this.tokenRefreshPromise = (async (): Promise<KeycloakTokens | null> => {
      if (!this.keycloakTokens) {
        throw new Error('No tokens available');
      }

      try {
        const refreshResult = await refresh(this.authConfiguration, {
          refreshToken: this.keycloakTokens.refresh.token,
        });

        const keycloakTokensRefreshed = createKeycloakTokens(refreshResult);
        this.keycloakTokens = keycloakTokensRefreshed;

        await storeKeycloakTokens(keycloakTokensRefreshed);

        this.scheduleTokenRefresh();

        // Emit onAuthRefreshSuccess event
        this.isTokenValidEventEmitter!(true);

        return keycloakTokensRefreshed;
      } catch {
        // const message = error instanceof Error ? error.message : String(error);
        // console.error('Failed to refresh token:', message);
        this.keycloakTokens = null;
        await clearKeycloakTokens();

        // Emit onAuthRefreshError event
        this.isTokenValidEventEmitter!(false);

        // Return null to indicate failure (don't throw, event already emitted)
        return null;
      } finally {
        this.tokenRefreshPromise = null;
      }
    })();

    return this.tokenRefreshPromise;
  }

  /**
   * Schedule automatic token refresh before expiration
   */
  private scheduleTokenRefresh(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }

    if (!this.keycloakTokens) {
      return;
    }

    const expiresAt = this.keycloakTokens.access.metadata.exp;
    if (!expiresAt) {
      return;
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = expiresAt - now;
    const refreshIn = Math.max(expiresIn - TOKEN_REFRESH_BUFFER_SECONDS, 0);

    this.tokenRefreshTimeout = setTimeout(() => {
      void this.refreshAccessToken();
    }, refreshIn * 1000);
  }

  private createIsTokenValidChannel(): EventChannel<boolean> {
    const isTokenValidChannel = eventChannel<boolean>((emitter) => {
      this.isTokenValidEventEmitter = emitter;

      // Initial token check (will be updated in initialize after checking stored tokens)
      if (this.keycloakTokens) {
        emitter(true);
      } else {
        emitter(false);
      }

      // Set up token refresh interval (mirrors web updateToken interval)
      const updateTokenInterval = setInterval(() => {
        if (!this.keycloakTokens) {
          emitter(false);
          return;
        }

        // Just check and emit current token validity
        // The scheduled refresh (scheduleTokenRefresh) handles proactive refreshing
        if (isTokenExpired(this.keycloakTokens.access)) {
          // Token expired - trigger immediate refresh
          void this.refreshAccessToken();
        } else {
          // Token still valid
          emitter(true);
        }
      }, 60000); // Check every minute (same as web)

      // Cleanup function
      return (): void => {
        this.isTokenValidEventEmitter = null;
        clearInterval(updateTokenInterval);
        if (this.tokenRefreshTimeout) {
          clearTimeout(this.tokenRefreshTimeout);
        }
      };
    });

    return isTokenValidChannel;
  }

  async initialize(): Promise<AuthInitResult> {
    // Check for stored tokens
    const keycloakTokensStored = await getKeycloakTokens();

    if (!keycloakTokensStored) {
      // Emit initial state: not authenticated
      this.isTokenValidEventEmitter!(false);
      return { isAuthenticated: false };
    }

    // Check if access token is expired
    if (isTokenExpired(keycloakTokensStored.access)) {
      this.keycloakTokens = keycloakTokensStored;
      const keycloakTokensRefreshed = await this.refreshAccessToken();

      if (keycloakTokensRefreshed) {
        return { isAuthenticated: true };
      }

      return { isAuthenticated: false };
    }

    // Tokens are valid - restore them
    this.keycloakTokens = keycloakTokensStored;
    this.scheduleTokenRefresh();

    // Emit initial state: authenticated
    this.isTokenValidEventEmitter!(true);
    return { isAuthenticated: true };
  }

  async login(): Promise<void> {
    try {
      const authResult = await authorize(this.authConfiguration);
      const keycloakTokens = createKeycloakTokens(authResult);

      this.keycloakTokens = keycloakTokens;
      await storeKeycloakTokens(keycloakTokens);

      // Schedule token refresh
      this.scheduleTokenRefresh();

      // Emit onAuthSuccess event (saga will set axios header)
      this.isTokenValidEventEmitter!(true);
    } catch (error) {
      // Emit onAuthError event                                                                                   │
      this.isTokenValidEventEmitter!(false);

      // // Log detailed error information
      // console.error('[StateAuthAdapter] Login failed - Full error details:');
      // console.error('[StateAuthAdapter] Error:', error);
      // const message = error instanceof Error ? error.message : String(error);
      // console.error('[StateAuthAdapter] Error message:', message);
      // const stack = error instanceof Error ? error.stack : String(error);
      // console.error('[StateAuthAdapter] Error stack:', stack);
      // if (error && typeof error === 'object') {
      //   console.error('[StateAuthAdapter] Error keys:', Object.keys(error));
      //   console.error(
      //     '[StateAuthAdapter] Full error object:',
      //     JSON.stringify(error, null, 2),
      //   );
      // }

      throw new Error('Login failed', { cause: error });
    }
  }

  async register(): Promise<void> {
    // For native apps, registration typically goes through the same OAuth flow
    // The user can be directed to registration from the Keycloak login page
    // Or we could add additionalParameters to the authorize call
    return this.login();
  }

  async logout(): Promise<void> {
    if (!this.keycloakTokens) {
      // Already logged out
      return;
    }

    try {
      // Revoke refresh token
      await revoke(this.authConfiguration, {
        tokenToRevoke: this.keycloakTokens.refresh.token,
        sendClientId: true,
      });
    } catch {
      // console.error('Token revocation failed (continuing with logout):', error);
    }

    // Clear tokens regardless of revocation success
    this.keycloakTokens = null;
    await clearKeycloakTokens();

    // Clear refresh timeout
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }

    // Emit onAuthLogout event (saga will clear axios header)
    this.isTokenValidEventEmitter!(false);
  }

  isAuthenticated(): boolean {
    return this.keycloakTokens !== null;
  }

  getTokens(): KeycloakTokens | null {
    return this.keycloakTokens;
  }

  getIsTokenValidChannel(): EventChannel<boolean> {
    return this.isTokenValidChannel;
  }
}
