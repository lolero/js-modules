import { BadRequestException, Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityUniqueKeyValue,
  requestsUtilGetUniqueKeysWhereFactory,
  utilsGetFilterDateRange,
} from '@js-modules/api-nest-utils';
import { AuthUsersService } from '@js-modules/api-nest-module-auth-keycloak';
import { KeycloakTokenParsed } from 'keycloak-js';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import upperCase from 'lodash/upperCase';
import { UsersEntity } from './users.entity';
import { UsersEntityType, UsersUniqueKeyName } from './users.types';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersServiceValidator } from './users.service.validator';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private usersServiceValidator: UsersServiceValidator,
  ) {}

  async checkIn(
    keycloakTokenParsed: KeycloakTokenParsed,
  ): Promise<UsersEntity | null> {
    const usersEntityWithoutId: Omit<
      UsersEntityType,
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    > = {
      keycloakId: keycloakTokenParsed.sub,
      username: keycloakTokenParsed.preferred_username ?? null,
      email: keycloakTokenParsed.sub,
      phoneNumber: keycloakTokenParsed.phone_number ?? null,
      firstName: keycloakTokenParsed.given_name ?? null,
      middleName: keycloakTokenParsed.middle_name ?? null,
      lastName: keycloakTokenParsed.family_name ?? null,
    };

    let usersEntity: UsersEntity;

    usersEntity = await this.usersRepository.findOneBy({
      keycloakId: usersEntityWithoutId.keycloakId,
    });

    if (!usersEntity) {
      usersEntity = await this.usersRepository.create(usersEntityWithoutId);

      usersEntity = await this.usersRepository.save(usersEntity);
      return usersEntity;
    }

    let isUsersEntityFieldChanged = false;
    keys(usersEntityWithoutId).forEach((key) => {
      const usersEntityPropKey = key as keyof typeof usersEntityWithoutId;
      if (
        usersEntityWithoutId[usersEntityPropKey] !==
        usersEntity[usersEntityPropKey]
      ) {
        isUsersEntityFieldChanged = true;
        usersEntity[usersEntityPropKey] =
          usersEntityWithoutId[usersEntityPropKey];
      }
    });

    if (isUsersEntityFieldChanged) {
      usersEntity = await this.usersRepository.save(usersEntity);
    }

    return usersEntity;
  }

  async findOne(
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<UsersEntity | null> {
    const usersEntity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return usersEntity;
  }

  async findMany(usersDtoFindMany: UsersDtoFindMany): Promise<UsersEntity[]> {
    const query = this.usersRepository.createQueryBuilder().select('*');

    if (usersDtoFindMany.uniqueKeys && !isEmpty(usersDtoFindMany.uniqueKeys)) {
      if (usersDtoFindMany.search) {
        throw new BadRequestException(
          'filtering by unique keys is only supported on its own. this request also included a search term',
        );
      }

      const whereFactory = requestsUtilGetUniqueKeysWhereFactory(
        usersDtoFindMany.uniqueKeys,
      );
      query.where(new Brackets(whereFactory));
    }

    if (usersDtoFindMany.createdAtRange) {
      const createdAtRange = utilsGetFilterDateRange(
        usersDtoFindMany.createdAtRange[0],
        usersDtoFindMany.createdAtRange[1],
      );
      query.andWhere('created_at >= :createdAtFrom', {
        createdAtFrom: createdAtRange[0],
      });
      query.andWhere('created_at <= :createdAtTo', {
        createdAtTo: createdAtRange[1],
      });
    }

    if (usersDtoFindMany.updatedAtRange) {
      const updatedAtRange = utilsGetFilterDateRange(
        usersDtoFindMany.updatedAtRange[0],
        usersDtoFindMany.updatedAtRange[1],
      );
      query.andWhere('updated_at >= :updatedAtFrom', {
        updatedAtFrom: updatedAtRange[0],
      });
      query.andWhere('updated_at <= :updatedAtTo', {
        updatedAtTo: updatedAtRange[1],
      });
    }

    if (usersDtoFindMany.deletedAtRange) {
      const deletedAtRange = utilsGetFilterDateRange(
        usersDtoFindMany.deletedAtRange[0],
        usersDtoFindMany.deletedAtRange[1],
      );
      query.andWhere('deleted_at >= :deletedAtFrom', {
        deletedAtFrom: deletedAtRange[0],
      });
      query.andWhere('deleted_at <= :deletedAtTo', {
        deletedAtTo: deletedAtRange[1],
      });
    }

    if (usersDtoFindMany.search) {
      query.andWhere('username = :username', {
        username: usersDtoFindMany.search,
      });
      query.andWhere('email = :email', { email: usersDtoFindMany.search });
      query.andWhere('phone_number = :phoneNumber', {
        phoneNumber: usersDtoFindMany.search,
      });
      query.andWhere('first_name = :firstName', {
        firstName: usersDtoFindMany.search,
      });
      query.andWhere('middle_name = :middleName', {
        middleName: usersDtoFindMany.search,
      });
      query.andWhere('last_name = :lastName', {
        lastName: usersDtoFindMany.search,
      });
    }

    let skip = 0;
    if (
      usersDtoFindMany.resultsPerPage &&
      usersDtoFindMany.page &&
      usersDtoFindMany.page > 1
    ) {
      skip = usersDtoFindMany.resultsPerPage * (usersDtoFindMany.page - 1);
    }

    let take = Infinity;
    if (usersDtoFindMany.resultsPerPage) {
      take = usersDtoFindMany.resultsPerPage;
    }

    query
      .orderBy(
        ':sortBy',
        upperCase(usersDtoFindMany.sortOrder ?? 'asc') as 'ASC' | 'DESC',
      )
      .setParameters({ sortBy: usersDtoFindMany.sortBy ?? 'username' })
      .skip(skip)
      .take(take);

    return query.getRawMany();
  }
}
