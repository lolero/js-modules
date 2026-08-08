import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModuleMetadata } from '@js-modules/api-nest-utils';
import { AuthController } from './auth.controller';
import { AuthMiddlewareCurrentUser } from './auth.middleware.currentUser';
import { AuthService } from './auth.service';
import { AuthUsersService } from './auth.types';

@Module({})
export class AuthModule {
  static register(
    usersModuleMetadata: AuthModuleMetadata<AuthUsersService>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [usersModuleMetadata.module],
      controllers: [AuthController],
      providers: [AuthService, usersModuleMetadata.serviceProvider],
      exports: [AuthService],
    };
  }

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddlewareCurrentUser).forRoutes('*');
  }
}
