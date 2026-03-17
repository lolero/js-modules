import {
  AuthConfiguration,
  AuthorizeResult,
  RefreshResult,
} from 'react-native-app-auth';
import {
  ACCESSIBLE,
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';
import { KeycloakServerConfig, KeycloakTokenParsed } from 'keycloak-js';
import camelCase from 'lodash/camelCase';
import lowerCase from 'lodash/lowerCase';
import { KeycloakTokens } from './stateAuth.types';

export const KEYCHAIN_SERVICE = 'com.travellog.auth';
export const TOKEN_REFRESH_BUFFER_SECONDS = 60;

export function getKeycloakTokenParsed(jwt: string): KeycloakTokenParsed {
  try {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const keycloakTokenJson = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join(''),
    );
    const keycloakTokenParsed: KeycloakTokenParsed =
      JSON.parse(keycloakTokenJson);
    return keycloakTokenParsed;
  } catch (error) {
    throw new Error('Failed to get KeycloakTokenParsed from JWT', {
      cause: error,
    });
  }
}

export function createKeycloakTokens(
  authResult: AuthorizeResult | RefreshResult,
): KeycloakTokens {
  const keycloakTokens: KeycloakTokens = {
    id: {
      token: authResult.idToken,
      metadata: getKeycloakTokenParsed(authResult.idToken),
    },
    access: {
      token: authResult.accessToken,
      metadata: getKeycloakTokenParsed(authResult.accessToken),
    },
    refresh: {
      token: authResult.refreshToken!,
      metadata: getKeycloakTokenParsed(authResult.refreshToken!),
    },
  };
  return keycloakTokens;
}

export function createAuthConfiguration({
  url,
  realm,
  clientId,
}: KeycloakServerConfig): AuthConfiguration {
  const authConfiguration: AuthConfiguration = {
    issuer: `${url}/realms/${realm}`,
    clientId,
    redirectUrl: `${lowerCase(camelCase(realm))}://oauth-callback`,
    scopes: ['openid', 'profile', 'email'],
    serviceConfiguration: {
      authorizationEndpoint: `${url}/realms/${realm}/protocol/openid-connect/auth`,
      tokenEndpoint: `${url}/realms/${realm}/protocol/openid-connect/token`,
      revocationEndpoint: `${url}/realms/${realm}/protocol/openid-connect/revoke`,
    },
  };

  return authConfiguration;
}

export async function storeKeycloakTokens(
  keycloakTokens: KeycloakTokens,
): Promise<void> {
  try {
    await setGenericPassword('keycloak_auth', JSON.stringify(keycloakTokens), {
      accessible: ACCESSIBLE.AFTER_FIRST_UNLOCK,
      service: KEYCHAIN_SERVICE,
    });
  } catch (error) {
    throw new Error('Failed to store tokens', { cause: error });
  }
}

export async function getKeycloakTokens(): Promise<KeycloakTokens | null> {
  try {
    const userCredentials = await getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });

    if (!userCredentials) {
      return null;
    }

    return JSON.parse(userCredentials.password) as KeycloakTokens;
  } catch (error) {
    throw new Error('Failed to retrieve tokens', { cause: error });
  }
}

export async function clearKeycloakTokens(): Promise<void> {
  try {
    await resetGenericPassword({
      service: KEYCHAIN_SERVICE,
    });
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
}

export function isTokenExpired(token: KeycloakTokens['access']): boolean {
  if (!token.metadata.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = token.metadata.exp;
  const timeUntilExpiry = expiresAt - now;

  // Consider expired if less than buffer time remaining
  const isTokenExpiredBoolean = timeUntilExpiry < TOKEN_REFRESH_BUFFER_SECONDS;
  return isTokenExpiredBoolean;
}
