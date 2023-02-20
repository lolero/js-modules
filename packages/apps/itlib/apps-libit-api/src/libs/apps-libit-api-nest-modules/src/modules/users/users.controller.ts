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
  AuthUsersUniqueKeyName,
  AuthUsersUniqueKeyValue,
} from '../../../../api-nest-utils/src';
import { InterceptorSerialize } from '../../../../api-nest-utils/src';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersDtoPublic } from './users.dto.public';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';

@Controller('users')
@InterceptorSerialize<UsersEntity>(UsersDtoPublic)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:uniqueKeyValue')
  findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: AuthUsersUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: AuthUsersUniqueKeyName = 'id',
  ): Promise<UsersEntity> {
    return this.usersService.findOne(uniqueKeyName, uniqueKeyValue);
  }

  @Get()
  findMany(@Query() usersDtoFindMany: UsersDtoFindMany) {
    return this.usersService.findMany(usersDtoFindMany);
  }

  @Put()
  updateManyWhole(
    @Body() usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[],
  ): Promise<UsersEntity[]> {
    return this.usersService.updateManyWhole(usersDtoUpdateOneWholeArray);
  }

  @Patch('/:id')
  async updateOnePartial(
    @Param('id') id: UsersEntity['id'],
    @Body() usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial,
  ): Promise<UsersEntity> {
    const usersEntities = await this.usersService.updateManyPartial({
      [id]: usersDtoUpdateOnePartial,
    });

    return usersEntities[0];
  }

  // TODO: test this format of DTO. namely, make sure validation works for
  //  values of DTO objects.
  @Patch()
  updateManyPartial(
    @Body()
    usersDtoUpdateManyPartialObject: Record<
      UsersEntity['id'],
      UsersDtoUpdateOnePartial
    >,
  ): Promise<UsersEntity[]> {
    return this.usersService.updateManyPartial(usersDtoUpdateManyPartialObject);
  }

  @Patch('/pattern')
  updateManyPartialWithPattern(
    @Body()
    usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern,
  ): Promise<UsersEntity[]> {
    return this.usersService.updateManyPartialWithPattern(
      usersDtoUpdateOnePartialWithPattern,
    );
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: UsersEntity['id']): Promise<void> {
    return this.usersService.deleteMany({ ids: [id] });
  }

  @Delete()
  deleteMany(
    @Body()
    usersDtoDeleteMany: UsersDtoDeleteMany,
  ): Promise<void> {
    return this.usersService.deleteMany(usersDtoDeleteMany);
  }
}
