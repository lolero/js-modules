import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { AuthModule } from '@js-modules/api-nest-module-auth-keycloak';
import { utilGetAuthUsersServiceProvider } from '@js-modules/api-nest-utils';
import {
  ProductsModule,
  UsersModule,
  UsersService,
} from '@js-modules/apps-vending-machine-api-core-modules';
import { AUTH_BASE_URI } from '@js-modules/apps-vending-machine-common-constants';
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
        authServerUrl: AUTH_BASE_URI,
        realm: 'vending-machine',
        clientId: 'client-api-core',
        secret: 'uoItDdPaliri190tg3Dn9gaaokYbHkpU',
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
        tokenValidation: TokenValidation.ONLINE,
      },
      {
        connectionConfig: {
          baseUrl: AUTH_BASE_URI,
          realmName: 'vending-machine',
        },
        credentials: {
          grantType: 'client_credentials',
          clientId: 'admin-cli',
          clientSecret: 'vUb6oPXZD2AmQb2dsKGWmWKpLL3KQTIj',
        },
      },
      {
        module: UsersModule,
        serviceProvider: utilGetAuthUsersServiceProvider(UsersService),
      },
    ),
    ProductsModule,
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
