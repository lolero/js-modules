import { DynamicModule, Module } from '@nestjs/common';
import isNull from 'lodash/isNull';
import {
  KeycloakConnectConfig,
  KeycloakConnectModule,
} from 'nest-keycloak-connect';
import { AuthModuleMetadata } from '@js-modules/api-nest-utils';
import {
  authProviderAuthGuard,
  authProviderAuthGuardMultiIssuer,
  authProviderAuthGuardUsersEntityCurrent,
  authProviderAuthServiceMultiIssuer,
  authProviderKeycloakAdminClient,
  authProviderResourceGuard,
  authProviderRoleGuard,
  getAuthProviderKeycloakAdminClientConfig,
  getAuthProviderKeycloakMultiIssuerConfig,
} from './auth.providers';
import {
  AuthUsersService,
  KeycloakAdminClientConfig,
  KeycloakMultiIssuerConfig,
} from './auth.types';

@Module({})
export class AuthModule {
  static registerAsync(
    keycloakConnectConfig: KeycloakConnectConfig,
    keycloakAdminClientConfig: KeycloakAdminClientConfig,
    keycloakMultiIssuerConfig: KeycloakMultiIssuerConfig | null, // Multi-Issuer config
    usersModuleMetadata: AuthModuleMetadata<AuthUsersService>,
  ): DynamicModule {
    const providers = [
      getAuthProviderKeycloakAdminClientConfig(keycloakAdminClientConfig),
      authProviderKeycloakAdminClient,
    ];

    if (isNull(keycloakMultiIssuerConfig)) {
      // Use default AuthGuard from nest-keycloak-connect
      providers.push(authProviderAuthGuard);
    } else {
      // Use multi-issuer AuthGuard with custom validation
      providers.push(
        getAuthProviderKeycloakMultiIssuerConfig(keycloakMultiIssuerConfig),
      );
      providers.push(authProviderAuthServiceMultiIssuer);
      providers.push(authProviderAuthGuardMultiIssuer);
    }

    providers.push(authProviderResourceGuard);
    providers.push(authProviderRoleGuard);
    providers.push(authProviderAuthGuardUsersEntityCurrent);
    providers.push(usersModuleMetadata.serviceProvider);

    return {
      module: AuthModule,
      global: true,
      imports: [
        KeycloakConnectModule.register(keycloakConnectConfig),
        usersModuleMetadata.module,
      ],
      providers,
      exports: [authProviderKeycloakAdminClient],
    };
  }
}
