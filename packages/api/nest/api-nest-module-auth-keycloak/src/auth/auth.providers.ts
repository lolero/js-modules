import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { KeycloakAdminClient } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import { KeycloakAdminClientConfig } from './auth.types';
import {
  KEYCLOAK_ADMIN_CLIENT,
  KEYCLOAK_ADMIN_CLIENT_CREDENTIALS,
} from './auth.constants';
import { AuthGuardUsersEntityCurrent } from './auth.guard.usersEntityCurrent';

export function getAuthProviderAdminClientCredentials(
  keycloakAdminClientConfig: KeycloakAdminClientConfig,
): Provider {
  return {
    provide: KEYCLOAK_ADMIN_CLIENT_CREDENTIALS,
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
  inject: [KEYCLOAK_ADMIN_CLIENT_CREDENTIALS],
};

export const authProviderAuthGuard: Provider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
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
