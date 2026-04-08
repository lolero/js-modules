import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { KeycloakTokenParsed } from 'keycloak-js' with {
  'resolution-mode': 'import',
};
import keys from 'lodash/keys';
import { Repository } from 'typeorm';
import { KeycloakAdminClient } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import {
  AuthUsersService,
  KEYCLOAK_ADMIN_CLIENT,
} from '@js-modules/api-nest-module-auth-keycloak';
import {
  EntityUniqueKeyValue,
  FindManyResponse,
  utilApplyFindManyFiltersToQuery,
  utilApplyFindManySortingAndPaginationToQuery,
} from '@js-modules/api-nest-utils';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { UsersEntity } from './users.entity';
import { UsersServiceUtils } from './users.service.utils';
import { UsersUniqueKeyName } from './users.types';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    private readonly usersServiceUtils: UsersServiceUtils,
    @Inject(KEYCLOAK_ADMIN_CLIENT)
    private readonly keycloakAdminClient: KeycloakAdminClient,
  ) {}

  async checkIn(
    keycloakTokenParsed: KeycloakTokenParsed,
  ): Promise<UsersEntity | null> {
    const keycloakUser =
      this.usersServiceUtils.getKeycloakUserFromTokenParsed(
        keycloakTokenParsed,
      );

    let usersEntity = await this.usersRepository.findOneBy({
      keycloakId: keycloakUser.keycloakId,
    });

    if (!usersEntity) {
      usersEntity = this.usersRepository.create(keycloakUser);
      usersEntity = await this.usersRepository.save(usersEntity);
      return usersEntity;
    }

    let isKeycloakFieldChanged = false;
    keys(keycloakUser).forEach((key) => {
      const usersEntityPropKey = key as keyof typeof keycloakUser;
      if (
        keycloakUser[usersEntityPropKey] !== usersEntity![usersEntityPropKey]
      ) {
        isKeycloakFieldChanged = true;
        usersEntity![usersEntityPropKey] = keycloakUser[usersEntityPropKey]!;
      }
    });

    if (isKeycloakFieldChanged) {
      usersEntity = await this.usersRepository.save(usersEntity);
    }

    return usersEntity;
  }

  async findOne(
    uniqueKeyValue: EntityUniqueKeyValue,
    uniqueKeyName: UsersUniqueKeyName,
  ): Promise<UsersEntity | null> {
    const usersEntity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue as UsersEntity[UsersUniqueKeyName],
    });

    return usersEntity;
  }

  async findMany(
    usersFindManyDto: UsersFindManyDto,
  ): Promise<FindManyResponse<UsersEntity>> {
    const query = this.usersRepository.createQueryBuilder();

    const queryFiltered = utilApplyFindManyFiltersToQuery<UsersEntity>(
      query,
      usersFindManyDto,
    );

    const querySortedAndPaginated =
      utilApplyFindManySortingAndPaginationToQuery<UsersEntity>(
        queryFiltered,
        usersFindManyDto,
      );

    const [entities, total] = await querySortedAndPaginated.getManyAndCount();

    return { entities, total };
  }

  async updateOnePartial(
    usersUpdateOnePartialDto: UsersUpdateOnePartialDto,
    usersEntityCurrent: UsersEntity,
  ): Promise<UsersEntity> {
    let isUsersEntityFieldChanged = false;
    (
      keys(usersUpdateOnePartialDto) as (keyof UsersEntity &
        keyof UsersUpdateOnePartialDto)[]
    ).forEach((usersEntityKey) => {
      const usersEntityValue = usersUpdateOnePartialDto[usersEntityKey];
      const usersEntityCurrentValue = usersEntityCurrent[usersEntityKey];
      if (
        usersEntityValue === undefined ||
        usersEntityCurrentValue === usersEntityValue
      ) {
        return;
      }

      usersEntityCurrent[usersEntityKey] = usersEntityValue;
      isUsersEntityFieldChanged = true;
    });

    if (!isUsersEntityFieldChanged) {
      return usersEntityCurrent;
    }

    const userRepresentation = await this.keycloakAdminClient.users.findOne({
      id: usersEntityCurrent.keycloakId,
    });

    const updatedKeycloakUserRepresentation =
      this.usersServiceUtils.getUpdatedKeycloakUserRepresentation(
        userRepresentation!,
        usersUpdateOnePartialDto,
      );

    await this.keycloakAdminClient.users.update(
      {
        id: usersEntityCurrent.keycloakId,
      },
      updatedKeycloakUserRepresentation,
    );
    const usersEntityUpdated =
      await this.usersRepository.save(usersEntityCurrent);

    return usersEntityUpdated;
  }

  async resetPassword(usersEntityCurrent: UsersEntity): Promise<void> {
    await this.keycloakAdminClient.users.executeActionsEmail({
      id: usersEntityCurrent.keycloakId,
      actions: ['UPDATE_PASSWORD'],
    });
  }

  async deleteOne(usersEntityCurrent: UsersEntity): Promise<void> {
    await this.usersRepository.softRemove(usersEntityCurrent);
  }
}
