import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import {
  EntityUniqueKeyValue,
  InterceptorSerialize,
} from '@js-modules/api-nest-utils';
import { ApiControllersTravelLog } from '@js-modules/apps-travel-log-common-constants';
import { AuthDecoratorUsersEntityCurrent } from '@js-modules/api-nest-module-auth-keycloak';
import { UsersEntity } from '../users/users.entity';
import { LogEntriesService } from './logEntries.service';
import { LogEntriesEntity } from './logEntries.entity';
import { LogEntriesDto } from './dtos/logEntries.dto';
import { LogEntriesUniqueKeyName } from './logEntries.types';
import { LogEntriesFindManyDto } from './dtos/logEntries.findMany.dto';
import { LogEntriesCreateOneDto } from './dtos/logEntries.createOne.dto';
import { LogEntriesUpdateOnePartialDto } from './dtos/logEntries.updateOnePartial.dto';
import { LogEntriesUpdateOneWholeDto } from './dtos/logEntries.updateOneWhole.dto';
import { LogEntriesUpdateManyPartialWithPatternDto } from './dtos/logEntries.updateManyPartialWithPattern.dto';
import { LogEntriesDeleteManyDto } from './dtos/logEntries.deleteMany.dto';

@Controller(ApiControllersTravelLog.logEntries)
@InterceptorSerialize<LogEntriesEntity>(LogEntriesDto)
export class LogEntriesController {
  constructor(private logEntriesService: LogEntriesService) {}

  @Post()
  async createOne(
    @Body()
    logEntriesCreateOneDto: LogEntriesCreateOneDto,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<LogEntriesEntity> {
    const logEntriesEntity = await this.logEntriesService.createOne(
      logEntriesCreateOneDto,
      usersEntityCurrent,
    );

    return logEntriesEntity;
  }

  @Get('/:uniqueKeyValue')
  async findOne(
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: LogEntriesUniqueKeyName = 'id',
  ): Promise<LogEntriesEntity | null> {
    const logEntriesEntity = await this.logEntriesService.findOne(
      uniqueKeyName,
      uniqueKeyValue,
    );

    return logEntriesEntity;
  }

  @Get()
  async findMany(
    @Query() logEntriesFindManyDto: LogEntriesFindManyDto,
  ): Promise<LogEntriesEntity[]> {
    const logEntriesEntities = await this.logEntriesService.findMany(
      logEntriesFindManyDto,
    );

    return logEntriesEntities;
  }

  @Put('/:uniqueKeyValue')
  async updateOneWhole(
    @Body()
    logEntriesUpdateOneWholeDto: LogEntriesUpdateOneWholeDto,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: LogEntriesUniqueKeyName = 'id',
  ): Promise<LogEntriesEntity> {
    const logEntriesEntity = await this.logEntriesService.updateOne(
      logEntriesUpdateOneWholeDto,
      usersEntityCurrent,
      uniqueKeyName,
      uniqueKeyValue,
    );

    return logEntriesEntity;
  }

  @Patch('/batch')
  async updateManyPartialWithPattern(
    @Body()
    logEntriesUpdateManyPartialWithPatternDto: LogEntriesUpdateManyPartialWithPatternDto,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<LogEntriesEntity[]> {
    const logEntriesEntity =
      await this.logEntriesService.updateManyPartialWithPattern(
        logEntriesUpdateManyPartialWithPatternDto,
        usersEntityCurrent,
      );

    return logEntriesEntity;
  }

  @Patch('/:uniqueKeyValue')
  async updateOnePartial(
    @Body()
    logEntriesUpdateOnePartialDto: LogEntriesUpdateOnePartialDto,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: LogEntriesUniqueKeyName = 'id',
  ): Promise<LogEntriesEntity> {
    const logEntriesEntity = await this.logEntriesService.updateOne(
      logEntriesUpdateOnePartialDto,
      usersEntityCurrent,
      uniqueKeyName,
      uniqueKeyValue,
    );

    return logEntriesEntity;
  }

  @Delete('/batch')
  async deleteMany(
    @Body() logEntriesDeleteManyDto: LogEntriesDeleteManyDto,
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
  ): Promise<void> {
    await this.logEntriesService.deleteMany(
      logEntriesDeleteManyDto,
      usersEntityCurrent,
    );
  }

  @Delete('/:uniqueKeyValue')
  async deleteOne(
    @AuthDecoratorUsersEntityCurrent()
    usersEntityCurrent: UsersEntity,
    @Param('uniqueKeyValue') uniqueKeyValue: EntityUniqueKeyValue,
    @Query('uniqueKeyName') uniqueKeyName: LogEntriesUniqueKeyName = 'id',
  ): Promise<void> {
    await this.logEntriesService.deleteOne(
      usersEntityCurrent,
      uniqueKeyName,
      uniqueKeyValue,
    );
  }
}
