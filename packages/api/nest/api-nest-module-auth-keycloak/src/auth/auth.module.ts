import { DynamicModule, Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConnectOptions } from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';
import { AuthModuleMetadata } from '@js-modules/api-nest-utils';
import { AuthUsersService } from './auth.types';
import { AuthGuardUsersEntityCurrent } from './auth.guard.usersEntityCurrent';

@Global()
@Module({})
export class AuthModule {
  static register(
    keycloakConnectOptions: KeycloakConnectOptions,
    usersModuleMetadata: AuthModuleMetadata<AuthUsersService>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [
        KeycloakConnectModule.register(keycloakConnectOptions),
        usersModuleMetadata.module,
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
        {
          provide: APP_GUARD,
          useClass: ResourceGuard,
        },
        {
          provide: APP_GUARD,
          useClass: RoleGuard,
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuardUsersEntityCurrent,
        },
        usersModuleMetadata.serviceProvider,
      ],
    };
  }
}
