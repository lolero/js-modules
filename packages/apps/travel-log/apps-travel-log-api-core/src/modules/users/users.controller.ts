import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  EntityUniqueKeyValue,
  InterceptorSerialize,
} from '@js-modules/api-nest-utils';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersDtoPublic } from './users.dto.public';
import { UsersUniqueKeyName } from './users.types';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

@Controller('users')
@InterceptorSerialize<UsersEntity>(UsersDtoPublic)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:uniqueKeyValue')
  async findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: UsersUniqueKeyName = 'id',
  ): Promise<UsersEntity | null> {
    const usersEntity = await this.usersService.findOne(
      uniqueKeyName,
      uniqueKeyValue,
    );

    return usersEntity;
  }

  @Get()
  async findMany(
    @Query() usersDtoFindMany: UsersDtoFindMany,
  ): Promise<UsersEntity[]> {
    const usersEntities = await this.usersService.findMany(usersDtoFindMany);

    return usersEntities;
  }

  @Patch()
  async updateOnePartial(
    @Body('data')
    usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
    @Body('currentPassword')
    currentPassword?: string,
  ): Promise<UsersEntity> {
    const usersEntity = await this.usersService.updateOnePartial(
      usersDtoUpdateOnePartial,
      usersEntityCurrent,
      currentPassword,
    );

    return usersEntity;
  }

  @Delete()
  async deleteOne(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
    @Body('currentPassword')
    currentPassword?: string,
  ): Promise<void> {
    await this.usersService.deleteOne(usersEntityCurrent, currentPassword);
  }
}
