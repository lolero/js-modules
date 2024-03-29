import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import keys from 'lodash/keys';
import upperCase from 'lodash/upperCase';
import {
  EntityUniqueKeyValue,
  utilCrossCheckIds,
} from '@js-modules/api-nest-utils';
import { SystemRolesEntity } from './systemRoles.entity';
import { SystemRolesDtoCreateOne } from './systemRoles.dto.createOne';
import { SystemRolesDtoUpdateOnePartial } from './systemRoles.dto.updateOnePartial';
import { SystemRolesDtoUpdateOnePartialWithPattern } from './systemRoles.dto.updateManyPartialWithPattern';
import { SystemRolesDtoDeleteMany } from './systemRoles.dto.deleteMany';
import { SystemRolesDtoFindMany } from './systemRoles.dto.findMany';
import { SystemRolesDtoUpdateOneWhole } from './systemRoles.dto.updateOneWhole';
import { SystemRolesUniqueKeyName } from './systemRoles.types';

@Injectable()
export class SystemRolesService {
  constructor(
    @InjectRepository(SystemRolesEntity)
    private systemRolesRepository: Repository<SystemRolesEntity>,
  ) {}

  async createMany(
    systemRolesDtoCreateOneArray: SystemRolesDtoCreateOne[],
  ): Promise<SystemRolesEntity[]> {
    const systemRolesEntities = this.systemRolesRepository.create(
      systemRolesDtoCreateOneArray,
    );

    return this.systemRolesRepository.save(systemRolesEntities);
  }

  async findOne(
    uniqueKeyName: SystemRolesUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<SystemRolesEntity | null> {
    const systemRolesEntity = await this.systemRolesRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return systemRolesEntity;
  }

  findMany(
    systemRolesDtoFindMany: SystemRolesDtoFindMany,
  ): Promise<SystemRolesEntity[]> {
    const query = this.systemRolesRepository.createQueryBuilder().select('*');

    if (systemRolesDtoFindMany.ids) {
      query.where('id = :id', { id: In(systemRolesDtoFindMany.ids) });
    }

    if (systemRolesDtoFindMany.search) {
      query.andWhere('name = :name', {
        name: systemRolesDtoFindMany.search,
      });
    }

    let skip = 0;
    if (
      systemRolesDtoFindMany.resultsPerPage &&
      systemRolesDtoFindMany.page &&
      systemRolesDtoFindMany.page > 1
    ) {
      skip =
        systemRolesDtoFindMany.resultsPerPage *
        (systemRolesDtoFindMany.page - 1);
    }

    let take = Infinity;
    if (systemRolesDtoFindMany.resultsPerPage) {
      take = systemRolesDtoFindMany.resultsPerPage;
    }

    query
      .orderBy(
        ':sortBy',
        upperCase(systemRolesDtoFindMany.sortOrder ?? 'asc') as 'ASC' | 'DESC',
      )
      .setParameters({
        sortBy: systemRolesDtoFindMany.sortBy ?? 'systemRolename',
      })
      .skip(skip)
      .take(take);

    return query.getRawMany();
  }

  async updateManyWhole(
    systemRolesDtoUpdateOneWholeArray: SystemRolesDtoUpdateOneWhole[],
  ): Promise<SystemRolesEntity[]> {
    const ids = systemRolesDtoUpdateOneWholeArray.map(
      (systemRoleEntityWhole) => systemRoleEntityWhole.id,
    );
    const systemRolesEntities = await this.systemRolesRepository.findBy({
      id: In(ids),
    });

    utilCrossCheckIds(ids, systemRolesEntities);

    const systemRolesEntitiesUpdated = systemRolesEntities.map(
      (systemRolesEntity, systemRolesEntityIndex) => {
        if (
          systemRolesEntity.id !==
          systemRolesDtoUpdateOneWholeArray[systemRolesEntityIndex].id
        ) {
          throw new InternalServerErrorException(
            'systemRole indexes dont match',
          );
        }

        return {
          ...systemRolesEntity,
          ...systemRolesDtoUpdateOneWholeArray[systemRolesEntityIndex],
        };
      },
    );

    return this.systemRolesRepository.save(systemRolesEntitiesUpdated);
  }

  async updateManyPartial(
    systemRolesDtoUpdateManyPartialObject: Record<
      SystemRolesEntity['id'],
      SystemRolesDtoUpdateOnePartial
    >,
  ): Promise<SystemRolesEntity[]> {
    const ids = keys(systemRolesDtoUpdateManyPartialObject).map((id) =>
      Number(id),
    );
    const systemRolesEntities = await this.systemRolesRepository.findBy({
      id: In(ids),
    });

    utilCrossCheckIds(ids, systemRolesEntities);

    const systemRolesEntitiesUpdated = systemRolesEntities.map(
      (systemRolesEntity) => {
        return {
          ...systemRolesEntity,
          ...systemRolesDtoUpdateManyPartialObject[systemRolesEntity.id],
        };
      },
    );

    return this.systemRolesRepository.save(systemRolesEntitiesUpdated);
  }

  async updateManyPartialWithPattern(
    systemRolesDtoUpdateOnePartialWithPattern: SystemRolesDtoUpdateOnePartialWithPattern,
  ): Promise<SystemRolesEntity[]> {
    const { ids, dtoUpdateOnePartial } =
      systemRolesDtoUpdateOnePartialWithPattern;
    const systemRolesEntities = await this.systemRolesRepository.findBy({
      id: In(ids),
    });

    utilCrossCheckIds(ids, systemRolesEntities);

    const systemRolesEntitiesUpdated = systemRolesEntities.map(
      (systemRolesEntity) => {
        return { ...systemRolesEntity, ...dtoUpdateOnePartial };
      },
    );

    return this.systemRolesRepository.save(systemRolesEntitiesUpdated);
  }

  async deleteMany(
    systemRolesDtoDeleteMany: SystemRolesDtoDeleteMany,
  ): Promise<void> {
    const { ids } = systemRolesDtoDeleteMany;
    const systemRolesEntities = await this.systemRolesRepository.findBy({
      id: In(ids),
    });

    utilCrossCheckIds(ids, systemRolesEntities);

    await this.systemRolesRepository.remove(systemRolesEntities);
  }
}
