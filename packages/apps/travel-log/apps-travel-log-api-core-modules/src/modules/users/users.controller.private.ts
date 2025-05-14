import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InterceptorSerialize } from '@js-modules/api-nest-utils';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import {
  ApiControllersTravelLog,
  ApiSubHandlersUsersPrivate,
} from '@js-modules/apps-travel-log-common-constants-cjs';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { UsersPrivateDto } from './dtos/users.private.dto';

@Controller(ApiControllersTravelLog.usersPrivate)
@InterceptorSerialize<UsersEntity>(UsersPrivateDto)
export class UsersControllerPrivate {
  constructor(private usersService: UsersService) {}

  @Get()
  async checkIn(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<UsersEntity | null> {
    return usersEntityCurrent;
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

  @Post(ApiSubHandlersUsersPrivate.resetPassword)
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
