import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { AuthModule } from '@js-modules/api-nest-module-auth-keycloak';
import { utilGetAuthUsersServiceProvider } from '@js-modules/api-nest-utils';
import { AUTH_BASE_URI } from '@js-modules/apps-travel-log-common-constants';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configTypeormDataSourceOptions } from '../../config/config.typeorm.dataSourceOptions';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(configTypeormDataSourceOptions),
    AuthModule.registerAsync(
      {
        authServerUrl: AUTH_BASE_URI,
        realm: 'travel-log',
        clientId: 'client-api-core',
        secret: 'ii0vJvq1eKz8S1vn9sDtmmc2oCHm6zj4',
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.ONLINE,
      },
      {
        connectionConfig: {
          baseUrl: AUTH_BASE_URI,
          realmName: 'travel-log',
        },
        credentials: {
          grantType: 'client_credentials',
          clientId: 'admin-cli',
          clientSecret: 'lp3kus0cbqjcQyPve3k3VBqguALkXWkw',
        },
      },
      {
        module: UsersModule,
        serviceProvider: utilGetAuthUsersServiceProvider(UsersService),
      },
    ),
    UsersModule,
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
