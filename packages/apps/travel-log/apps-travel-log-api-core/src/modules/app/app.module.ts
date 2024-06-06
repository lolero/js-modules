import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { AuthModule } from '@js-modules/api-nest-module-auth-keycloak';
import { utilGetAuthUsersServiceProvider } from '@js-modules/api-nest-utils';
import { AUTH_URI_TRAVEL_LOG } from '@js-modules/apps-travel-log-common-constants';
import {
  LogEntriesModule,
  UsersModule,
  UsersService,
} from '@js-modules/apps-travel-log-api-core-modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configTypeormDataSourceOptions } from '../../config/config.typeorm.dataSourceOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(configTypeormDataSourceOptions),
    AuthModule.registerAsync(
      {
        authServerUrl: AUTH_URI_TRAVEL_LOG,
        realm: 'travel-log',
        clientId: 'client-api-core',
        secret: 'eaIQtsBBeyPTPYMawRZkEfwry6wHMCly',
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.ONLINE,
      },
      {
        connectionConfig: {
          baseUrl: AUTH_URI_TRAVEL_LOG,
          realmName: 'travel-log',
        },
        credentials: {
          grantType: 'client_credentials',
          clientId: 'admin-cli',
          clientSecret: 'jldaG8BrX98J5UxEqYnHXhOm1B4YU5E3',
        },
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
      }),
    },
    AppService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
