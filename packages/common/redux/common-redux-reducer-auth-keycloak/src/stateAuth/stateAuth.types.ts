import type {
  KeycloakInitOptions,
  KeycloakLoginOptions,
  KeycloakLogoutOptions,
  KeycloakTokenParsed,
} from 'keycloak-js';
import type { EventChannel } from 'redux-saga';
import type {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export enum ClientType {
  native = 'native',
  web = 'web',
}

export enum SigninAction {
  signup = 'signup',
  login = 'login',
}

type KeycloakToken = {
  token: string;
  metadata: KeycloakTokenParsed;
};

export type KeycloakTokens = {
  id: KeycloakToken;
  access: KeycloakToken;
  refresh: KeycloakToken;
};

export interface StateAuthReducerMetadata extends ReducerMetadata {
  isKeycloakReady: boolean;
  isAuthenticated: boolean;
  tokens: KeycloakTokens | null;
}

export type StateAuthReducer = Reducer<StateAuthReducerMetadata, Entity>;

/**
 * Authentication initialization result
 */
export interface AuthInitResult {
  isAuthenticated: boolean;
}

/**
 * Unified authentication adapter interface
 * Supports both web (keycloak-js) and native (react-native-app-auth) implementations
 */
export interface AuthAdapter {
  /**
   * Initialize the authentication system
   * For web: initializes Keycloak with check-sso
   * For native: checks for stored tokens and validates them
   */
  initialize(initOptions: KeycloakInitOptions): Promise<AuthInitResult>;

  /**
   * Trigger login flow
   * For web: redirects to Keycloak login page
   * For native: opens OAuth browser flow with PKCE
   */
  login(options?: KeycloakLoginOptions): Promise<void>;

  /**
   * Trigger registration flow
   * For web: redirects to Keycloak registration page
   * For native: opens OAuth browser flow to registration endpoint
   */
  register(options?: KeycloakLoginOptions): Promise<void>;

  /**
   * Trigger logout flow
   * For web: redirects to Keycloak logout page
   * For native: revokes tokens and clears storage
   */
  logout(options?: KeycloakLogoutOptions): Promise<void>;

  /**
   * Get current authentication status
   */
  isAuthenticated(): boolean;

  /**
   * Get current tokens
   */
  getTokens(): KeycloakTokens | null;

  /**
   * Get event channel for token validity monitoring
   * Emits true when tokens are valid, false when invalid/expired
   */
  getIsTokenValidChannel(): EventChannel<boolean>;
}
