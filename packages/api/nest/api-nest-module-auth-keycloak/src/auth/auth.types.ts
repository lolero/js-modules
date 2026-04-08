import type { KeycloakTokenParsed } from 'keycloak-js' with {
  'resolution-mode': 'import',
};
import type {
  ConnectionConfig,
  Credentials,
} from '@js-modules/api-nest-keycloak-admin-client-cjs';

export type AllowedIssuers = [string, ...string[]];

export type KeycloakMultiIssuerConfig = {
  allowedIssuers: AllowedIssuers;
  isOfflineValidationAllowed: boolean;
};

export type KeycloakAdminClientConfig = {
  connectionConfig: ConnectionConfig;
  credentials: Credentials;
};

export interface AuthUsersService {
  checkIn: (
    keycloakTokenParsed: KeycloakTokenParsed,
    // @typescript-eslint/no-explicit-any disabled because the specific user
    // entity type is irrelevant for the return type of the checkIn function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<Record<string, any> | null>;
}

export type AuthRequest = {
  cookies?: Record<string, string>;
  headers: { authorization?: string };
  user?: KeycloakTokenParsed;
  accessTokenJWT?: string;
  // @typescript-eslint/no-explicit-any disabled because the specific user
  // entity type is irrelevant for the AuthRequest
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  usersEntityCurrent?: Record<string, any> | null;
};
