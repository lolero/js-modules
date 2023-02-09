import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  AuthInterceptorCurrentAuthenticatedUser,
  getAuthUsersServiceProvider,
} from '../api-nest-utils/src';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    getAuthUsersServiceProvider(UsersService),
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptorCurrentAuthenticatedUser,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
