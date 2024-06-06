import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityUniqueKeyValue,
  utilApplyFindManyFiltersToQuery,
  utilApplyFindManySortingAndPaginationToQuery,
  utilCrossCheckIds,
  utilVerifyEntitiesPartialRelation,
} from '@js-modules/api-nest-utils';
import { pick } from 'lodash';
import { LogEntriesEntity } from './logEntries.entity';
import { LogEntriesUniqueKeyName } from './logEntries.types';
import { LogEntriesFindManyDto } from './dtos/logEntries.findMany.dto';
import { LogEntriesUpdateOnePartialDto } from './dtos/logEntries.updateOnePartial.dto';
import { LogEntriesCreateOneDto } from './dtos/logEntries.createOne.dto';
import { UsersEntity } from '../users/users.entity';
import { LogEntriesUpdateOneWholeDto } from './dtos/logEntries.updateOneWhole.dto';
import { LogEntriesUpdateManyPartialWithPatternDto } from './dtos/logEntries.updateManyPartialWithPattern.dto';
import { LogEntriesDeleteManyDto } from './dtos/logEntries.deleteMany.dto';

@Injectable()
export class LogEntriesService {
  constructor(
    @InjectRepository(LogEntriesEntity)
    private logEntriesRepository: Repository<LogEntriesEntity>,
  ) {}

  async createOne(
    logEntriesCreateOneDto: LogEntriesCreateOneDto,
    usersEntityCurrent: UsersEntity,
  ): Promise<LogEntriesEntity> {
    const logEntriesEntity = this.logEntriesRepository.create({
      ...logEntriesCreateOneDto,
      user: usersEntityCurrent,
    });
    const logEntriesEntityCreated = await this.logEntriesRepository.save(
      logEntriesEntity,
    );

    return logEntriesEntityCreated;
  }

  async findOne(
    uniqueKeyName: LogEntriesUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<LogEntriesEntity | null> {
    const logEntriesEntity = await this.logEntriesRepository.findOneBy({
      [uniqueKeyName]:
        uniqueKeyValue as LogEntriesEntity[LogEntriesUniqueKeyName],
    });

    return logEntriesEntity;
  }

  async findMany(
    logEntriesFindManyDto: LogEntriesFindManyDto,
  ): Promise<LogEntriesEntity[]> {
    const query = this.logEntriesRepository.createQueryBuilder();

    const queryFiltered = utilApplyFindManyFiltersToQuery<LogEntriesEntity>(
      query,
      logEntriesFindManyDto,
    );

    const querySortedAndPaginated =
      utilApplyFindManySortingAndPaginationToQuery<LogEntriesEntity>(
        queryFiltered,
        logEntriesFindManyDto,
      );

    const logEntriesEntities =
      await querySortedAndPaginated.getRawMany<LogEntriesEntity>();

    return logEntriesEntities;
  }

  async updateOne(
    logEntriesUpdateOneDto:
      | LogEntriesUpdateOneWholeDto
      | LogEntriesUpdateOnePartialDto,
    usersEntityCurrent: UsersEntity,
    uniqueKeyName: LogEntriesUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<LogEntriesEntity> {
    const logEntriesEntity = await this.logEntriesRepository.findOneBy({
      [uniqueKeyName]:
        uniqueKeyValue as LogEntriesEntity[LogEntriesUniqueKeyName],
    });

    if (!logEntriesEntity) {
      throw new NotFoundException();
    }

    utilVerifyEntitiesPartialRelation<LogEntriesEntity, UsersEntity>(
      [logEntriesEntity],
      'user',
      pick(usersEntityCurrent, ['id']),
    );

    const logEntriesEntityUpdatedPreSave = Object.assign(
      logEntriesEntity,
      logEntriesUpdateOneDto,
    );

    const logEntriesEntityUpdated = await this.logEntriesRepository.save(
      logEntriesEntityUpdatedPreSave,
    );

    return logEntriesEntityUpdated;
  }

  async updateManyPartialWithPattern(
    logEntriesUpdateManyPartialWithPatternDto: LogEntriesUpdateManyPartialWithPatternDto,
    usersEntityCurrent: UsersEntity,
  ): Promise<LogEntriesEntity[]> {
    const { ids, dtoUpdateOnePartial } =
      logEntriesUpdateManyPartialWithPatternDto;
    const logEntriesEntities = await this.logEntriesRepository.findBy({
      id: In(ids),
    });

    utilCrossCheckIds(ids, logEntriesEntities);
    utilVerifyEntitiesPartialRelation<LogEntriesEntity, UsersEntity>(
      logEntriesEntities,
      'user',
      pick(usersEntityCurrent, ['id']),
    );

    const logEntriesEntitiesUpdatedPreSave = logEntriesEntities.map(
      (logEntriesEntity) =>
        Object.assign(logEntriesEntity, dtoUpdateOnePartial),
    );

    const logEntriesEntitiesUpdated = await this.logEntriesRepository.save(
      logEntriesEntitiesUpdatedPreSave,
    );

    return logEntriesEntitiesUpdated;
  }

  async deleteMany(
    logEntriesDeleteManyDto: LogEntriesDeleteManyDto,
    usersEntityCurrent: UsersEntity,
  ): Promise<void> {
    const { ids } = logEntriesDeleteManyDto;
    const logEntriesEntities = await this.logEntriesRepository.findBy({
      id: In(ids),
    });

    utilCrossCheckIds(ids, logEntriesEntities);
    utilVerifyEntitiesPartialRelation<LogEntriesEntity, UsersEntity>(
      logEntriesEntities,
      'user',
      pick(usersEntityCurrent, ['id']),
    );

    await this.logEntriesRepository.softRemove(logEntriesEntities);
  }

  async deleteOne(
    usersEntityCurrent: UsersEntity,
    uniqueKeyName: LogEntriesUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<void> {
    const logEntriesEntity = await this.logEntriesRepository.findOneBy({
      [uniqueKeyName]:
        uniqueKeyValue as LogEntriesEntity[LogEntriesUniqueKeyName],
    });

    if (!logEntriesEntity) {
      throw new NotFoundException();
    }

    utilVerifyEntitiesPartialRelation<LogEntriesEntity, UsersEntity>(
      [logEntriesEntity],
      'user',
      pick(usersEntityCurrent, ['id']),
    );

    await this.logEntriesRepository.softRemove(logEntriesEntity);
  }
}
