import { DynamicModule, Global, Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { KeycloakConnectOptions } from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';
import { AuthModuleMetadata } from '@js-modules/api-nest-utils';
import { AuthUsersService, KeycloakAdminClientConfig } from './auth.types';
import {
  authProviderKeycloakAdminClient,
  authProviderAuthGuard,
  authProviderAuthGuardUsersEntityCurrent,
  authProviderResourceGuard,
  authProviderRoleGuard,
  getAuthProviderAdminClientCredentials,
} from './auth.providers';

@Global()
@Module({})
export class AuthModule {
  static registerAsync(
    keycloakConnectOptions: KeycloakConnectOptions,
    keycloakAdminClientConfig: KeycloakAdminClientConfig,
    usersModuleMetadata: AuthModuleMetadata<AuthUsersService>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        KeycloakConnectModule.register(keycloakConnectOptions),
        usersModuleMetadata.module,
      ],
      providers: [
        getAuthProviderAdminClientCredentials(keycloakAdminClientConfig),
        authProviderKeycloakAdminClient,
        authProviderAuthGuard,
        authProviderResourceGuard,
        authProviderRoleGuard,
        authProviderAuthGuardUsersEntityCurrent,
        usersModuleMetadata.serviceProvider,
      ],
      exports: [authProviderKeycloakAdminClient],
    };
  }
}
