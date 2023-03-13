import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  EntityUniqueKeyValue,
  InterceptorSerialize,
} from '@js-modules/api-nest-utils';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersDtoPublic } from './users.dto.public';
import { UsersUniqueKeyName } from './users.types';
import { UsersDtoFindMany } from './users.dto.findMany';

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
}
