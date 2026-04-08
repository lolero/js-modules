import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import cookieSession from 'cookie-session';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { AuthModule } from '@js-modules/api-nest-module-auth-keycloak';
import { utilGetAuthUsersServiceProvider } from '@js-modules/api-nest-utils';
import {
  LogEntriesModule,
  UsersModule,
  UsersService,
} from '@js-modules/apps-travel-log-api-modules-core';
import {
  AUTH__URI__TRAVEL_LOG,
  AUTH__URI_DEV_ANDROID__TRAVEL_LOG,
  AUTH_SERVER__URI__TRAVEL_LOG,
} from '@js-modules/apps-travel-log-common-constants-cjs';
import {
  getEnvFileName,
  IS_ENV_DEV,
} from '@js-modules/common-utils-general-cjs';
import { configTypeormDataSourceOptions } from '../../config/config.typeorm.dataSourceOptions';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFileName(),
    }),
    TypeOrmModule.forRoot(configTypeormDataSourceOptions),
    AuthModule.registerAsync(
      {
        authServerUrl: AUTH_SERVER__URI__TRAVEL_LOG,
        realm: 'travel-log',
        clientId: 'client-api-core',
        secret: process.env.KEYCLOAK_SECRET_CLIENT_API_CORE ?? '',
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.ONLINE,
      },
      {
        connectionConfig: {
          baseUrl: AUTH_SERVER__URI__TRAVEL_LOG,
          realmName: 'travel-log',
        },
        credentials: {
          grantType: 'client_credentials',
          clientId: 'admin-cli',
          clientSecret: process.env.KEYCLOAK_SECRET_ADMIN_CLI,
        },
      },
      {
        allowedIssuers: [
          AUTH__URI__TRAVEL_LOG,
          AUTH_SERVER__URI__TRAVEL_LOG,
          ...(IS_ENV_DEV ? [AUTH__URI_DEV_ANDROID__TRAVEL_LOG] : []),
        ],
        isOfflineValidationAllowed: IS_ENV_DEV,
      },
      {
        module: UsersModule,
        serviceProvider: utilGetAuthUsersServiceProvider(UsersService),
      },
    ),
    UsersModule,
    LogEntriesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    AppService,
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY') ?? ''],
        }),
      )
      .forRoutes('*');
  }
}
