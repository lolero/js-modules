import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilGetAuthUsersServiceProvider } from '@js-modules/api-nest-utils';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UsersService, utilGetAuthUsersServiceProvider(UsersService)],
  exports: [UsersService],
})
export class UsersModule {}
