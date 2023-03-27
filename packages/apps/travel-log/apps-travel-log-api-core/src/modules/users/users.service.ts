import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityUniqueKeyValue,
  utilApplyFindManyFiltersToQuery,
  utilApplyFindManySortingAndPaginationToQuery,
} from '@js-modules/api-nest-utils';
import { AuthUsersService } from '@js-modules/api-nest-module-auth-keycloak';
import { KeycloakTokenParsed } from 'keycloak-js';
import keys from 'lodash/keys';
import { UsersEntity } from './users.entity';
import { UsersEntityType, UsersUniqueKeyName } from './users.types';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersServiceValidator } from './users.service.validator';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

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
    const userKeycloak: Omit<
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
      keycloakId: userKeycloak.keycloakId,
    });

    if (!usersEntity) {
      const usersEntityWithoutId = {
        ...userKeycloak,
      };
      usersEntity = await this.usersRepository.create(usersEntityWithoutId);

      usersEntity = await this.usersRepository.save(usersEntity);
      return usersEntity;
    }

    let isKeycloakFieldChanged = false;
    keys(userKeycloak).forEach((key) => {
      const usersEntityPropKey = key as keyof typeof userKeycloak;
      if (
        userKeycloak[usersEntityPropKey] !== usersEntity[usersEntityPropKey]
      ) {
        isKeycloakFieldChanged = true;
        usersEntity[usersEntityPropKey] = userKeycloak[usersEntityPropKey];
      }
    });

    if (isKeycloakFieldChanged) {
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
    const query = this.usersRepository.createQueryBuilder();

    const queryFiltered = utilApplyFindManyFiltersToQuery<UsersEntity>(
      query,
      usersDtoFindMany,
    );

    const querySortedAndPaginated =
      utilApplyFindManySortingAndPaginationToQuery<UsersEntity>(
        queryFiltered,
        usersDtoFindMany,
      );

    return querySortedAndPaginated.getRawMany();
  }

  async updateOnePartial(
    usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial,
    usersEntityCurrent: UsersEntity,
    currentPassword?: string,
  ): Promise<UsersEntity> {
    const query = this.usersRepository.createQueryBuilder();

    const queryFiltered = utilApplyFindManyFiltersToQuery<UsersEntity>(
      query,
      usersDtoFindMany,
    );

    const querySortedAndPaginated =
      utilApplyFindManySortingAndPaginationToQuery<UsersEntity>(
        queryFiltered,
        usersDtoFindMany,
      );

    return querySortedAndPaginated.getRawMany();
  }

  async deleteOne(
    usersEntityCurrent: UsersEntity,
    currentPassword?: string,
  ): Promise<UsersEntity> {
    const query = this.usersRepository.createQueryBuilder();

    const queryFiltered = utilApplyFindManyFiltersToQuery<UsersEntity>(
      query,
      usersDtoFindMany,
    );

    const querySortedAndPaginated =
      utilApplyFindManySortingAndPaginationToQuery<UsersEntity>(
        queryFiltered,
        usersDtoFindMany,
      );

    return querySortedAndPaginated.getRawMany();
  }
}
