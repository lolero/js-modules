import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  EntityUniqueKeyValue,
  InterceptorSerialize,
} from '@js-modules/api-nest-utils';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersPublicDto } from './dtos/users.public.dto';
import { UsersUniqueKeyName } from './users.types';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';

@Controller('users')
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

  @Patch()
  async updateOnePartial(
    @Body()
    usersUpdateOnePartialDto: UsersUpdateOnePartialDto,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<UsersEntity> {
    const usersEntity = await this.usersService.updateOnePartial(
      usersUpdateOnePartialDto,
      usersEntityCurrent,
    );

    return usersEntity;
  }

  @Post('/reset-password')
  async resetPassword(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<void> {
    await this.usersService.resetPassword(usersEntityCurrent);
  }

  @Delete()
  async deleteOne(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<void> {
    await this.usersService.deleteOne(usersEntityCurrent);
  }
}
