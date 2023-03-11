import omit from 'lodash/omit';
import { getRequestsDtoQueryParamsFindManyFixture } from '@js-modules/api-nest-utils';
import {
  getAuthDtoSignupFixture,
  getAuthUserEntityFixture,
} from '@js-modules/api-nest-module-auth-basic';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';
import { UsersEntity } from './users.entity';
import { getSystemRolesEntityFixture } from '../systemRoles/systemRoles.utils.fixtures';
import { UsersEntityType } from './users.types';
import { UsersDtoFindManyUniqueKeys } from './users.dto.findManyUniqueKeys';

export function getUsersEntityFixture(
  overrides: Partial<UsersEntityType> = {},
): UsersEntity {
  const usersEntityDefault: UsersEntityType = {
    ...omit(getAuthUserEntityFixture(), 'id'),
    id: 1,
    systemRoles: [getSystemRolesEntityFixture()],
  };

  const usersEntity = Object.assign(usersEntityDefault, overrides);

  return usersEntity as UsersEntity;
}

export function getUsersDtoCreateOneFixture(
  overrides: Partial<UsersDtoCreateOne> = {},
): UsersDtoCreateOne {
  return getAuthDtoSignupFixture(overrides);
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
    username: 'test_username',
    email: 'test@email.com',
    phoneNumber: '+18001234567',
    password: 'test_password',
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
