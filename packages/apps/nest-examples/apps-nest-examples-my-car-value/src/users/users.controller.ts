import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import type {
  UsersUniqueKeyName,
  UsersUniqueKeyValue,
} from '../api-nest-utils/src';
import { Serialize } from '../api-nest-utils/src';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersDtoPublic } from './users.dto.public';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

@Controller('users')
@Serialize<UsersEntity>(UsersDtoPublic)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/hello-world')
  usersHelloWorld() {
    console.log('this is a hello world message');
    return 'hello world';
  }

  @Get('/:uniqueKeyValue')
  usersFindOne(
    @Param('uniqueKeyValue') uniqueKeyValue: UsersUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName?: UsersUniqueKeyName,
  ): Promise<UsersEntity> {
    return this.usersService.findOne(uniqueKeyName ?? 'id', uniqueKeyValue);
  }

  @Get()
  usersFindMany(@Query('email') email: string) {
    return this.usersService.findMany(email);
  }

  // TODO: implement update many whole controller

  @Patch()
  usersUpdateManyPartial(
    @Body()
    partialEntities: Record<UsersEntity['id'], UsersDtoUpdateOnePartial>,
  ): Promise<UsersEntity[]> {
    return this.usersService.updateManyPartial(partialEntities);
  }

  // TODO: replace delete one with delete many controller
  @Delete('/:id')
  usersDeleteOne(@Param('id') id: string): Promise<UsersEntity> {
    return this.usersService.deleteOne(id);
  }
}
