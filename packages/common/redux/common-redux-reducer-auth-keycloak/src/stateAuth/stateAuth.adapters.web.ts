import Keycloak, {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
} from 'keycloak-js';
import { EventChannel, eventChannel } from 'redux-saga';
import { AuthAdapter, AuthInitResult, KeycloakTokens } from './stateAuth.types';

/**
 * Web authentication adapter using keycloak-js
 * Wraps browser-based Keycloak OAuth flows
 */
export class StateAuthAdaptersWeb implements AuthAdapter {
  private keycloak: Keycloak;

  private isTokenValidChannel: EventChannel<boolean>;

  constructor(config: KeycloakConfig) {
    this.keycloak = new Keycloak(config);
    this.isTokenValidChannel = this.createIsTokenValidChannel();
  }

  private createIsTokenValidChannel(): EventChannel<boolean> {
    const keycloakInstance = this.keycloak;

    const isTokenValidChannel = eventChannel<boolean>((emit) => {
      // Initial token check
      if (keycloakInstance.authenticated && keycloakInstance.token) {
        emit(true);
      } else {
        emit(false);
      }

      // Set up token refresh interval
      const updateTokenInterval = setInterval(async () => {
        try {
          // Try to refresh token 70 seconds before expiration
          await keycloakInstance.updateToken(70);

          // Check if still authenticated
          if (keycloakInstance.authenticated && keycloakInstance.token) {
            emit(true);
          } else {
            emit(false);
          }
        } catch (error) {
          console.error('Failed to refresh token:', error);
          emit(false);
        }
      }, 60000); // Check every minute

      // Keycloak events
      keycloakInstance.onAuthSuccess = () => {
        emit(true);
      };

      keycloakInstance.onAuthError = () => {
        emit(false);
      };

      keycloakInstance.onAuthRefreshSuccess = () => {
        emit(true);
      };

      keycloakInstance.onAuthRefreshError = () => {
        emit(false);
      };

      keycloakInstance.onAuthLogout = () => {
        emit(false);
      };

      keycloakInstance.onTokenExpired = () => {
        // Token expired, try to refresh
        keycloakInstance
          .updateToken(5)
          .then(() => {
            emit(true);
          })
          .catch(() => {
            emit(false);
          });
      };

      // Cleanup function
      return () => {
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
