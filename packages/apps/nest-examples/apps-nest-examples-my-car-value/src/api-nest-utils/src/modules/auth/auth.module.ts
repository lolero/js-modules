import { DynamicModule, Module } from '@nestjs/common';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ClassConstructor } from 'class-transformer';
import { AuthService } from './auth.service';
import { UsersServiceType } from './auth.types';
import { AuthController } from './auth.controller';

@Module({})
export class AuthModule {
  static register(
    usersModule: ClassConstructor<any>,
    usersServiceProvider: FactoryProvider<UsersServiceType>,
  ): DynamicModule {
    return {
      module: AuthModule,
      imports: [usersModule],
      controllers: [AuthController],
      providers: [AuthService, usersServiceProvider],
      exports: [AuthService],
    };
  }
}
