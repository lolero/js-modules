import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import type {
  EntityUniqueKeyValue,
  UpdateManyEntitiesObjectDto,
} from '@js-modules/api-nest-utils';
import { InterceptorSerialize } from '@js-modules/api-nest-utils';
import { AuthDecoratorCurrentUser } from '@js-modules/api-nest-module-auth-basic';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersDtoPublic } from './users.dto.public';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import type { UsersUniqueKeyName } from './users.types';

@Controller('users')
@InterceptorSerialize<UsersEntity>(UsersDtoPublic)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:uniqueKeyValue')
  findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: UsersUniqueKeyName = 'id',
  ): Promise<UsersEntity | null> {
    return this.usersService.findOne(uniqueKeyName, uniqueKeyValue);
  }

  @Get()
  findMany(@Query() usersDtoFindMany: UsersDtoFindMany) {
    return this.usersService.findMany(usersDtoFindMany);
  }

  @Put()
  async updateManyWhole(
    @Body('data')
    usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[],
    @AuthDecoratorCurrentUser() currentUser?: UsersEntity,
    @Body('currentPassword')
    currentPassword?: string,
  ): Promise<UsersEntity[]> {
    const usersDtoUpdateManyPartialObject = usersDtoUpdateOneWholeArray.reduce(
      (
        usersDtoUpdateManyPartialObjectTemp: UpdateManyEntitiesObjectDto<UsersDtoUpdateOnePartial>,
        usersDtoUpdateOneWhole,
      ) => {
        const usersDtoUpdateManyPartialObjectTempNew: UpdateManyEntitiesObjectDto<UsersDtoUpdateOnePartial> =
          {
            ...usersDtoUpdateManyPartialObjectTemp,
            [usersDtoUpdateOneWhole.id]: usersDtoUpdateOneWhole,
          };

        return usersDtoUpdateManyPartialObjectTempNew;
      },
      {},
    );

    const usersEntities = await this.usersService.updateManyPartial(
      usersDtoUpdateManyPartialObject,
      currentUser,
      currentPassword,
    );
    return usersEntities;
  }

  @Patch('/:id')
  async updateOnePartial(
    @Param('id') id: UsersEntity['id'],
    @Body('data')
    usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial,
    @AuthDecoratorCurrentUser() currentUser?: UsersEntity,
    @Body('currentPassword')
    currentPassword?: string,
  ): Promise<UsersEntity> {
    const usersDtoUpdateManyPartialObject: UpdateManyEntitiesObjectDto<UsersDtoUpdateOnePartial> =
      {
        [id]: usersDtoUpdateOnePartial,
      };

    const usersEntities = await this.usersService.updateManyPartial(
      usersDtoUpdateManyPartialObject,
      currentUser,
      currentPassword,
    );
    return usersEntities[0];
  }

  @Patch()
  async updateManyPartial(
    @Body('data')
    usersDtoUpdateManyPartialObject: UpdateManyEntitiesObjectDto<UsersDtoUpdateOnePartial>,
    @AuthDecoratorCurrentUser() currentUser?: UsersEntity,
    @Body('currentPassword')
    currentPassword?: string,
  ): Promise<UsersEntity[]> {
    const usersEntities = await this.usersService.updateManyPartial(
      usersDtoUpdateManyPartialObject,
      currentUser,
      currentPassword,
    );
    return usersEntities;
  }

  @Patch('/pattern')
  async updateManyPartialWithPattern(
    @Body()
    usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern,
    @AuthDecoratorCurrentUser() currentUser?: UsersEntity,
  ): Promise<UsersEntity[]> {
    const usersDtoUpdateManyPartialObject =
      usersDtoUpdateOnePartialWithPattern.ids.reduce(
        (
          usersDtoUpdateManyPartialObjectTemp: UpdateManyEntitiesObjectDto<UsersDtoUpdateOnePartial>,
          id,
        ) => {
          const usersDtoUpdateManyPartialObjectTempNew: UpdateManyEntitiesObjectDto<UsersDtoUpdateOnePartial> =
            {
              ...usersDtoUpdateManyPartialObjectTemp,
              [id]: usersDtoUpdateOnePartialWithPattern.dtoUpdateOnePartial,
            };

          return usersDtoUpdateManyPartialObjectTempNew;
        },
        {},
      );

    const usersEntities = await this.usersService.updateManyPartial(
      usersDtoUpdateManyPartialObject,
      currentUser,
    );
    return usersEntities;
  }

  @Delete('/:id')
  deleteOne(
    @Param('id') id: UsersEntity['id'],
    @AuthDecoratorCurrentUser() currentUser?: UsersEntity,
    @Body('currentPassword')
    currentPassword?: string,
  ): Promise<void> {
    return this.usersService.deleteMany([id], currentUser, currentPassword);
  }

  @Delete()
  deleteMany(
    @Body('data')
    usersDtoDeleteMany: UsersDtoDeleteMany,
    @AuthDecoratorCurrentUser() currentUser?: UsersEntity,
  ): Promise<void> {
    return this.usersService.deleteMany(usersDtoDeleteMany.ids, currentUser);
  }
}
