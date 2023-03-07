import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import cookieSession from 'cookie-session';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthModule,
  authUtilGetAuthUsersServiceProvider,
} from '@js-modules/apps-nest-module-auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  UsersModule,
  UsersService,
  SystemRolesModule,
} from '../../libs/apps-nest-examples-users-modules/src';
import { configTypeormDataSourceOptions } from '../../config/config.typeorm.dataSourceOptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(configTypeormDataSourceOptions),
    AuthModule.register({
      module: UsersModule,
      serviceProvider: authUtilGetAuthUsersServiceProvider(UsersService),
    }),
    UsersModule,
    SystemRolesModule,
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
