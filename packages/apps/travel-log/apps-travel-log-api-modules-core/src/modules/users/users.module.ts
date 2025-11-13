import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersServiceUtils } from './users.service.utils';
import { UsersControllerPrivate } from './users.controller.private';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [UsersControllerPrivate, UsersController],
  providers: [UsersService, UsersServiceUtils],
  exports: [UsersService],
})
export class UsersModule {}
