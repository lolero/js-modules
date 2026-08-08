import type {
  KeycloakInitOptions,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakServerConfig,
} from 'keycloak-js';
import Keycloak from 'keycloak-js';
import type { EventChannel } from 'redux-saga';
import { eventChannel } from 'redux-saga';
import type {
  AuthAdapter,
  AuthInitResult,
  KeycloakTokens,
} from './stateAuth.types';

/**
 * Web authentication adapter using keycloak-js
 * Wraps browser-based Keycloak OAuth flows
 */
export class StateAuthAdapter implements AuthAdapter {
  private keycloak: Keycloak;

  private isTokenValidChannel: EventChannel<boolean>;

  constructor(config: KeycloakServerConfig) {
    this.keycloak = new Keycloak(config);
    this.isTokenValidChannel = this.createIsTokenValidChannel();
  }

  private createIsTokenValidChannel(): EventChannel<boolean> {
    const keycloakInstance = this.keycloak;

    const isTokenValidChannel = eventChannel<boolean>((emit) => {
      const clearTokenAndEmitFalse = (): void => {
        // Only clear if tokens exist
        if (keycloakInstance.token || keycloakInstance.refreshToken) {
          keycloakInstance.clearToken();
        }
        emit(false);
      };

      // Initial token check
      if (keycloakInstance.authenticated && keycloakInstance.token) {
        emit(true);
      } else {
        // Not authenticated on initial check
        // Clear any stale tokens as defensive measure
        clearTokenAndEmitFalse();
      }

      // Set up token refresh interval
      const updateTokenInterval = setInterval(() => {
        void keycloakInstance
          // Try to refresh token 70 seconds before expiration
          .updateToken(70)
          .then(() => {
            // Check if still authenticated
            if (keycloakInstance.authenticated && keycloakInstance.token) {
              emit(true);
            } else {
              clearTokenAndEmitFalse();
            }
          })
          .catch(() => {
            // console.error('Failed to refresh token:', error);
            clearTokenAndEmitFalse();
          });
      }, 60000); // Check every minute

      // Keycloak events
      keycloakInstance.onAuthSuccess = (): void => {
        emit(true);
      };

      keycloakInstance.onAuthError = (): void => {
        clearTokenAndEmitFalse();
      };

      keycloakInstance.onAuthRefreshSuccess = (): void => {
        emit(true);
      };

      keycloakInstance.onAuthRefreshError = (): void => {
        clearTokenAndEmitFalse();
      };

      keycloakInstance.onAuthLogout = (): void => {
        clearTokenAndEmitFalse();
      };

      keycloakInstance.onTokenExpired = (): void => {
        // Token expired, try to refresh
        keycloakInstance
          .updateToken(5)
          .then(() => {
            emit(true);
          })
          .catch(() => {
            clearTokenAndEmitFalse();
          });
      };

      // Cleanup function
      return (): void => {
        clearInterval(updateTokenInterval);
        keycloakInstance.onAuthSuccess = undefined;
        keycloakInstance.onAuthError = undefined;
        keycloakInstance.onAuthRefreshSuccess = undefined;
        keycloakInstance.onAuthRefreshError = undefined;
        keycloakInstance.onAuthLogout = undefined;
        keycloakInstance.onTokenExpired = undefined;
      };
    });

    return isTokenValidChannel;
  }

  async initialize(initOptions: KeycloakInitOptions): Promise<AuthInitResult> {
    const isAuthenticated = await this.keycloak.init(initOptions);

    return { isAuthenticated };
  }

  async login(options?: KeycloakLoginOptions): Promise<void> {
    await this.keycloak.login(options);
  }

  async register(options?: KeycloakLoginOptions): Promise<void> {
    await this.keycloak.register(options);
  }

  async logout(options?: KeycloakLogoutOptions): Promise<void> {
    // Logout will redirect to Keycloak, clearing server-side session
    // keycloak-js will clear tokens automatically during logout process
    // The onAuthLogout event will fire after redirect, triggering clearTokenAndEmitFalse()
    // This ensures tokens are cleared via event handlers without interfering with logout flow
    await this.keycloak.logout(options);
  }

  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  getTokens(): KeycloakTokens | null {
    if (!this.keycloak.authenticated) {
      return null;
    }

    return {
      id: {
        token: this.keycloak.idToken!,
        metadata: this.keycloak.idTokenParsed!,
      },
      access: {
        token: this.keycloak.token!,
        metadata: this.keycloak.tokenParsed!,
      },
      refresh: {
        token: this.keycloak.refreshToken!,
        metadata: this.keycloak.refreshTokenParsed!,
      },
    };
  }

  getIsTokenValidChannel(): EventChannel<boolean> {
    return this.isTokenValidChannel;
  }
}
