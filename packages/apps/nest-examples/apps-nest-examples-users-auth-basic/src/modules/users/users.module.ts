import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilGetAuthUsersServiceProvider } from '@js-modules/api-nest-utils';
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
    utilGetAuthUsersServiceProvider(UsersService),
    UsersServiceValidator,
  ],
  exports: [UsersService],
})
export class UsersModule {}
