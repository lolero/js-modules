import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { InterceptorSerialize } from '@js-modules/api-nest-utils';
import {
  ApiControllersTravelLog,
  ApiSubHandlersUsersPrivate,
} from '@js-modules/apps-travel-log-common-constants-cjs';
import { UsersPrivateDto } from './dtos/users.private.dto';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@Controller(ApiControllersTravelLog.usersPrivate)
@InterceptorSerialize<UsersEntity>(UsersPrivateDto)
export class UsersControllerPrivate {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  checkIn(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): UsersEntity | null {
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
