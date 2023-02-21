import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import { UsersDtoFindMany } from './users.dto.findMany';
import {
  getRequestsDtoQueryParamsFindManyFixture,
  getAuthDtoSignupFixture,
} from '../../../../api-nest-utils/src';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';

export function getUsersEntityFixture(
  overrides: Partial<UsersDtoUpdateOneWhole> = {},
): UsersDtoUpdateOneWhole {
  const usersEntityDefault: UsersDtoUpdateOneWhole = {
    id: 'test_id',
    username: 'test_username',
    email: 'test@email.com',
    phoneNumber: '+18001234567',
    password: 'test_password',
  };

  const usersEntity = Object.assign(usersEntityDefault, overrides);

  return usersEntity;
}

export function getUsersDtoCreateOneFixture(
  overrides: Partial<UsersDtoCreateOne> = {},
): UsersDtoCreateOne {
  return getAuthDtoSignupFixture(overrides);
}

export function getUsersDtoFindManyFixture(
  overrides: Partial<UsersDtoFindMany> = {},
): UsersDtoFindMany {
  return getRequestsDtoQueryParamsFindManyFixture<UsersDtoFindMany['sortBy']>(
    overrides,
  );
}

export function getUsersDtoUpdateOneWholeFixture(
  overrides: Partial<UsersDtoUpdateOneWhole> = {},
): UsersDtoUpdateOneWhole {
  return getUsersEntityFixture(overrides);
}

export function getUsersDtoUpdateOnePartialFixture(
  overrides: Partial<UsersDtoUpdateOnePartial> = {},
): UsersDtoUpdateOnePartial {
  const usersDtoUpdateOnePartialDefault: UsersDtoUpdateOnePartial = {
    username: 'test_username_new',
  };

  const usersDtoUpdateOnePartial = Object.assign(
    usersDtoUpdateOnePartialDefault,
    overrides,
  );

  return usersDtoUpdateOnePartial;
}

export function getUsersDtoUpdateOnePartialWithPatternFixture(
  overrides: {
    ids?: UsersDtoUpdateOnePartialWithPattern['ids'];
    dtoUpdateOnePartial?: UsersDtoUpdateOnePartialWithPattern['dtoUpdateOnePartial'];
  } = {},
): UsersDtoUpdateOnePartialWithPattern {
  const usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern =
    {
      ids: overrides.ids ?? ['test_id_1', 'test_id_2'],
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
    ids: ['test_id_1', 'test_id_2'],
  };

  const usersDtoDeleteMany = Object.assign(
    usersDtoDeleteManyDefault,
    overrides,
  );

  return usersDtoDeleteMany;
}
