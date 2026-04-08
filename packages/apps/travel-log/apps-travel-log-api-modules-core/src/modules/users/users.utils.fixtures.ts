import omit from 'lodash/omit';
import type { UserRepresentation } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import { utilGetFindManyDtoFixture } from '@js-modules/api-nest-utils';
import type { UsersFindManyDto } from './dtos/users.findMany.dto';
import type { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import type { UsersEntity } from './users.entity';
import type { KeycloakUser, UsersEntityType } from './users.types';

export function getUsersEntityFixture(
  overrides: Partial<UsersEntityType> = {},
): UsersEntity {
  const usersEntityDefault: UsersEntityType = {
    id: 1,
    keycloakId: 'test_keycloak_id',
    username: 'test_username_1',
    email: 'test_1@email.com',
    phoneNumber: '+18001111111',
    firstName: 'test_first_name',
    middleName: 'test_middle_name',
    lastName: 'test_last_name',
    createdAt: new Date('2000-01-01T00:00:00.000Z'),
    updatedAt: new Date('2000-01-01T00:00:00.000Z'),
  };

  const usersEntity = Object.assign(usersEntityDefault, overrides);

  return usersEntity as UsersEntity;
}

export function getKeycloakUserFixture(
  overrides: Partial<KeycloakUser> = {},
): KeycloakUser {
  const keycloakUserDefault: KeycloakUser = omit(getUsersEntityFixture(), [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  ]);

  const keycloakUser = Object.assign(keycloakUserDefault, overrides);

  return keycloakUser;
}

export function getKeycloakUserRepresentationFixture(
  overrides: Partial<UserRepresentation> = {},
): UserRepresentation {
  const usersEntity = getUsersEntityFixture();
  const keycloakUserRepresentationDefault: UserRepresentation = {
    id: usersEntity.keycloakId,
    username: usersEntity.username,
    email: usersEntity.email,
    firstName: usersEntity.firstName,
    lastName: usersEntity.lastName,
  };

  const keycloakUserRepresentation = Object.assign(
    keycloakUserRepresentationDefault,
    overrides,
  );

  return keycloakUserRepresentation;
}

export function getUsersFindManyDtoFixture(
  overrides: Partial<UsersFindManyDto> = {},
): UsersFindManyDto {
  return utilGetFindManyDtoFixture<UsersEntity, UsersFindManyDto>(overrides);
}

export function getUsersUpdateOnePartialDtoFixture(
  overrides: Partial<UsersUpdateOnePartialDto> = {},
): UsersUpdateOnePartialDto {
  return overrides;
}
