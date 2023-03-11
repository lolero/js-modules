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
  AuthUsersUniqueKeyName,
  AuthUsersUniqueKeyValue,
} from '@js-modules/api-nest-module-auth-basic';
import { InterceptorSerialize } from '@js-modules/api-nest-utils';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersDtoPublic } from './users.dto.public';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

@Controller('users')
@InterceptorSerialize<UsersEntity>(UsersDtoPublic)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/hello-world')
  usersHelloWorld() {
    console.log('this is a hello world message');
    return 'hello world';
  }

  @Get('/:uniqueKeyValue')
  findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: AuthUsersUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName?: AuthUsersUniqueKeyName,
  ): Promise<UsersEntity> {
    return this.usersService.findOne(uniqueKeyName ?? 'id', uniqueKeyValue);
  }

  @Get()
  findMany(@Query('email') email: string) {
    return this.usersService.findMany(email);
  }

  @Patch()
  updateManyPartial(
    @Body()
    partialEntities: Record<UsersEntity['id'], UsersDtoUpdateOnePartial>,
  ): Promise<UsersEntity[]> {
    return this.usersService.updateManyPartial(partialEntities);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: string): Promise<UsersEntity> {
    return this.usersService.deleteOne(id);
  }
}
