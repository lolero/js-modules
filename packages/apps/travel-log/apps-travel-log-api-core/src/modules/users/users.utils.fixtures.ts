import { getRequestsDtoQueryParamsFindManyFixture } from '@js-modules/api-nest-utils';
import omit from 'lodash/omit';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';
import { UsersEntity } from './users.entity';
import { UsersEntityType } from './users.types';
import { UsersDtoFindManyUniqueKeys } from './users.dto.findManyUniqueKeys';

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

export function getUsersDtoCreateOneFixture(
  overrides: Partial<UsersDtoCreateOne> = {},
): UsersDtoCreateOne {
  const userEntity = getUsersEntityFixture();

  const usersDtoCreateOneDefault: UsersDtoCreateOne = omit(
    userEntity,
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  );

  const usersDtoCreateOne = Object.assign(usersDtoCreateOneDefault, overrides);

  return usersDtoCreateOne;
}

export function getUsersDtoFindManyFixture(
  overrides: Partial<UsersDtoFindMany> = {},
): UsersDtoFindMany {
  return getRequestsDtoQueryParamsFindManyFixture<
    UsersDtoFindManyUniqueKeys,
    UsersDtoFindMany['sortBy']
  >(overrides);
}

export function getUsersDtoUpdateOneWholeFixture(
  overrides: Partial<UsersDtoUpdateOneWhole> = {},
): UsersDtoUpdateOneWhole {
  const usersDtoUpdateOneWholeDefault: UsersDtoUpdateOneWhole = {
    id: 1,
    keycloakId: 'test_keycloak_id',
    username: 'test_username_1',
    email: 'test_1@email.com',
    phoneNumber: '+18001111111',
    firstName: 'test_first_name',
    middleName: 'test_middle_name',
    lastName: 'test_last_name',
  };

  const usersDtoUpdateOneWhole = Object.assign(
    usersDtoUpdateOneWholeDefault,
    overrides,
  );

  return usersDtoUpdateOneWhole;
}

export function getUsersDtoUpdateOnePartialFixture(
  overrides: Partial<UsersDtoUpdateOnePartial> = {},
): UsersDtoUpdateOnePartial {
  return overrides;
}

export function getUsersDtoUpdateOnePartialWithPatternFixture(
  overrides: {
    ids?: UsersDtoUpdateOnePartialWithPattern['ids'];
    dtoUpdateOnePartial?: UsersDtoUpdateOnePartialWithPattern['dtoUpdateOnePartial'];
  } = {},
): UsersDtoUpdateOnePartialWithPattern {
  const usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern =
    {
      ids: overrides.ids ?? [1, 2],
      dtoUpdateOnePartial: getUsersDtoUpdateOnePartialFixture(
        overrides.dtoUpdateOnePartial,
      ),
    };

  return usersDtoUpdateOnePartialWithPattern;
}

export function getUsersDtoDeleteManyFixture(
  overrides: Partial<UsersDtoDeleteMany> = {},
): UsersDtoDeleteMany {
  const usersDtoDeleteManyDefault: UsersDtoDeleteMany = {
    ids: [1, 2],
  };

  const usersDtoDeleteMany = Object.assign(
    usersDtoDeleteManyDefault,
    overrides,
  );

  return usersDtoDeleteMany;
}
