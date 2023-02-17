import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ClassConstructor } from 'class-transformer';
import { AuthService } from './auth.service';
import { AuthUsersService } from './auth.types';
import { AuthController } from './auth.controller';
import { AuthMiddlewareCurrentUser } from './auth.middleware.currentUser';

@Module({})
export class AuthModule {
  static register(
    usersModule: ClassConstructor<any>,
    usersServiceProvider: FactoryProvider<AuthUsersService>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [usersModule],
      controllers: [AuthController],
      providers: [AuthService, usersServiceProvider],
      exports: [AuthService],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlewareCurrentUser).forRoutes('*');
  }
}
