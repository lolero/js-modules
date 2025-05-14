import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  EntityUniqueKeyValue,
  InterceptorSerialize,
} from '@js-modules/api-nest-utils';
import { ApiControllersTravelLog } from '@js-modules/apps-travel-log-common-constants-cjs';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersPublicDto } from './dtos/users.public.dto';
import { UsersUniqueKeyName } from './users.types';
import { UsersFindManyDto } from './dtos/users.findMany.dto';

@Controller(ApiControllersTravelLog.usersPublic)
@InterceptorSerialize<UsersEntity>(UsersPublicDto)
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
    @Query() usersFindManyDto: UsersFindManyDto,
  ): Promise<UsersEntity[]> {
    const usersEntities = await this.usersService.findMany(usersFindManyDto);

    return usersEntities;
  }
}
