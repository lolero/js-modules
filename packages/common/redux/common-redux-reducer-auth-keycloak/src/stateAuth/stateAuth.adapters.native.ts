import {
  AuthConfiguration,
  authorize,
  refresh,
  revoke,
} from 'react-native-app-auth';
import { EventChannel, eventChannel } from 'redux-saga';
import { KeycloakConfig } from 'keycloak-js';
import { AuthAdapter, AuthInitResult, KeycloakTokens } from './stateAuth.types';
import {
  createKeycloakTokens,
  createAuthConfiguration,
  clearKeycloakTokens,
  isTokenExpired,
  getKeycloakTokens,
  storeKeycloakTokens,
  TOKEN_REFRESH_BUFFER_SECONDS,
} from './stateAuth.adapters.native.utils';

/**
 * Native authentication adapter using react-native-app-auth
 * Implements OAuth Authorization Code + PKCE flow for mobile apps
 */
export class StateAuthAdaptersNative implements AuthAdapter {
  private authConfiguration: AuthConfiguration;

  private isTokenValidChannel: EventChannel<boolean>;

  private isTokenValidEventEmitter: ((isTokenValid: boolean) => void) | null =
    null;

  private keycloakTokens: KeycloakTokens | null = null;

  private tokenRefreshTimeout: NodeJS.Timeout | null = null;

  private tokenRefreshPromise: Promise<KeycloakTokens | null> | null = null;

  constructor(config: KeycloakConfig) {
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
      } catch (error) {
        console.error('Failed to refresh token:', error);
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
      this.refreshAccessToken();
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
          this.refreshAccessToken();
        } else {
          // Token still valid
          emitter(true);
        }
      }, 60000); // Check every minute (same as web)

      // Cleanup function
      return () => {
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

      // Log detailed error information                                                                           │
      console.error(
        '[StateAuthAdaptersNative] Login failed - Full error details:',
      );
      console.error('[StateAuthAdaptersNative] Error:', error);
      console.error(
        '[StateAuthAdaptersNative] Error message:',
        (error as Error).message,
      );
      console.error(
        '[StateAuthAdaptersNative] Error stack:',
        (error as Error).stack,
      );
      if (error && typeof error === 'object') {
        console.error(
          '[StateAuthAdaptersNative] Error keys:',
          Object.keys(error),
        );
        console.error(
          '[StateAuthAdaptersNative] Full error object:',
          JSON.stringify(error, null, 2),
        );
      }

      throw new Error('Login failed', { cause: error });
    }
  }

  async register(): Promise<void> {
    // For native apps, registration typically goes through the same OAuth flow
    // The user can be directed to registration from the Keycloak login page
    // Or we could add additionalParameters to the authorize call
    return this.login();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    } catch (error) {
      console.error('Token revocation failed (continuing with logout):', error);
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
