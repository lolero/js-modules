import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EntityUniqueKeyValue,
  utilApplyFindManyFiltersToQuery,
  utilApplyFindManySortingAndPaginationToQuery,
} from '@js-modules/api-nest-utils';
import {
  AuthUsersService,
  KEYCLOAK_ADMIN_CLIENT,
} from '@js-modules/api-nest-module-auth-keycloak';
import { KeycloakTokenParsed } from 'keycloak-js';
import { KeycloakAdminClient } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import keys from 'lodash/keys';
import entries from 'lodash/entries';
import { UsersEntity } from './users.entity';
import { UsersUniqueKeyName } from './users.types';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersServiceUtils } from './users.service.utils';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';

@Injectable()
export class UsersService implements AuthUsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
    private usersServiceUtils: UsersServiceUtils,
    @Inject(KEYCLOAK_ADMIN_CLIENT)
    private keycloakAdminClient: KeycloakAdminClient,
  ) {}

  async checkIn(
    keycloakTokenParsed: KeycloakTokenParsed,
  ): Promise<UsersEntity | null> {
    const keycloakUser =
      this.usersServiceUtils.getKeycloakUserFromTokenParsed(
        keycloakTokenParsed,
      );

    let usersEntity: UsersEntity | null;

    usersEntity = await this.usersRepository.findOneBy({
      keycloakId: keycloakUser.keycloakId,
    });

    if (!usersEntity) {
      usersEntity = await this.usersRepository.create(keycloakUser);

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
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: EntityUniqueKeyValue,
  ): Promise<UsersEntity | null> {
    const usersEntity = await this.usersRepository.findOneBy({
      [uniqueKeyName]: uniqueKeyValue,
    });

    return usersEntity;
  }

  async findMany(usersFindManyDto: UsersFindManyDto): Promise<UsersEntity[]> {
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

    const usersEntities =
      await querySortedAndPaginated.getRawMany<UsersEntity>();

    return usersEntities;
  }

  async updateOnePartial(
    usersUpdateOnePartialDto: UsersUpdateOnePartialDto,
    usersEntityCurrent: UsersEntity,
  ): Promise<UsersEntity> {
    let isUsersEntityFieldChanged = false;
    entries(usersUpdateOnePartialDto).forEach(
      ([usersEntityKey, usersEntityValue]) => {
        const usersEntityCurrentValue =
          usersEntityCurrent[usersEntityKey as keyof UsersEntity];
        if (
          usersEntityValue === undefined ||
          usersEntityCurrentValue === usersEntityValue
        ) {
          return;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        usersEntityCurrent[usersEntityKey] = usersEntityValue;
        isUsersEntityFieldChanged = true;
      },
    );

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
    const usersEntityUpdated = await this.usersRepository.save(
      usersEntityCurrent,
    );

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
