import { KeycloakTokenParsed } from 'keycloak-js';
import {
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
  checkIn: (keycloakTokenParsed: KeycloakTokenParsed) => Promise<any | null>;
}
