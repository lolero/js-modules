import type { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { KeycloakAdminClient } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import {
  KEYCLOAK_ADMIN_CLIENT,
  KEYCLOAK_ADMIN_CLIENT_CONFIG,
  KEYCLOAK_MULTI_ISSUER_CONFIG,
} from './auth.constants';
import { AuthGuardMultiIssuer } from './auth.guard.multiIssuer';
import { AuthGuardUsersEntityCurrent } from './auth.guard.usersEntityCurrent';
import { AuthServiceMultiIssuer } from './auth.service.multiIssuer';
import type {
  KeycloakAdminClientConfig,
  KeycloakMultiIssuerConfig,
} from './auth.types';

export function getAuthProviderKeycloakAdminClientConfig(
  keycloakAdminClientConfig: KeycloakAdminClientConfig,
): Provider {
  return {
    provide: KEYCLOAK_ADMIN_CLIENT_CONFIG,
    useValue: keycloakAdminClientConfig,
  };
}

export const authProviderKeycloakAdminClient: Provider = {
  provide: KEYCLOAK_ADMIN_CLIENT,
  useFactory: async (keycloakAdminClientConfig: KeycloakAdminClientConfig) => {
    const keycloakAdminClient = new KeycloakAdminClient(
      keycloakAdminClientConfig.connectionConfig,
    );
    await keycloakAdminClient.auth(keycloakAdminClientConfig.credentials);
    return keycloakAdminClient;
  },
  inject: [KEYCLOAK_ADMIN_CLIENT_CONFIG],
};

export const authProviderAuthGuard: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

export function getAuthProviderKeycloakMultiIssuerConfig(
  keycloakMultiIssuerConfig: KeycloakMultiIssuerConfig,
): Provider {
  return {
    provide: KEYCLOAK_MULTI_ISSUER_CONFIG,
    useValue: keycloakMultiIssuerConfig,
  };
}

export const authProviderAuthServiceMultiIssuer: Provider = {
  provide: AuthServiceMultiIssuer,
  useClass: AuthServiceMultiIssuer,
};

export const authProviderAuthGuardMultiIssuer: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuardMultiIssuer,
};

export const authProviderResourceGuard: Provider = {
  provide: APP_GUARD,
  useClass: ResourceGuard,
};

export const authProviderRoleGuard: Provider = {
  provide: APP_GUARD,
  useClass: RoleGuard,
};

export const authProviderAuthGuardUsersEntityCurrent: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuardUsersEntityCurrent,
};
