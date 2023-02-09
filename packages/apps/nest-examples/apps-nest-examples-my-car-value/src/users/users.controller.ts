import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
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

  @Get()
  usersFindMany(@Query('email') email: string) {
    return this.usersService.findMany(email);
  }

  @Get('/:id')
  usersFindOne(@Param('id') id: string): Promise<UsersEntity> {
    return this.usersService.findOne(Number(id));
  }

  @Patch('/:id')
  usersUpdateOnePartial(
    @Param('id') id: string,
    @Body() partialUserEntity: UsersDtoUpdateOnePartial,
  ): Promise<UsersEntity> {
    return this.usersService.updateOnePartial(Number(id), partialUserEntity);
  }

  @Delete('/:id')
  usersRemoveOne(@Param('id') id: string): Promise<UsersEntity> {
    return this.usersService.removeOne(Number(id));
  }
}
