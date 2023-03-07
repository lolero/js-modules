import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authUtilGetAuthUsersServiceProvider } from '@js-modules/apps-nest-module-auth';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { SystemRolesModule } from '../systemRoles/systemRoles.module';
import { UsersServiceValidator } from './users.service.validator';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), SystemRolesModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    authUtilGetAuthUsersServiceProvider(UsersService),
    UsersServiceValidator,
  ],
  exports: [UsersService],
})
export class UsersModule {}
