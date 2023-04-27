import { utilGetDtoFindManyFixture } from '@js-modules/api-nest-utils';
import omit from 'lodash/omit';
import { UsersUpdateOneWholeDto } from './dtos/users.updateOneWhole.dto';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersCreateOneDto } from './dtos/users.createOne.dto';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';
import { UsersUpdateManyPartialWithPatternDto } from './dtos/users.updateManyPartialWithPattern.dto';
import { UsersDeleteManyDto } from './dtos/users.deleteMany.dto';
import { UsersEntity } from './users.entity';
import { UsersEntityType } from './users.types';
import { UsersFindManyUniqueKeysDto } from './dtos/users.findManyUniqueKeys.dto';
import { UsersFindManySearchDto } from './dtos/users.findManySearch.dto';
import { UsersFindManyRelationsDto } from './dtos/users.findManyRelations.dto';
import { UsersFindManyRangesDatesDto } from './dtos/users.findManyRangesDates.dto';
import { UsersFindManyRangesNumberDto } from './dtos/users.findManyRangesNumber.dto';
import { UsersFindManyRangesStringDto } from './dtos/users.findManyRangesString.dto';

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

export function getUsersCreateOneDtoFixture(
  overrides: Partial<UsersCreateOneDto> = {},
): UsersCreateOneDto {
  const userEntity = getUsersEntityFixture();

  const usersCreateOneDtoDefault: UsersCreateOneDto = omit(
    userEntity,
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
  );

  const usersCreateOneDto = Object.assign(usersCreateOneDtoDefault, overrides);

  return usersCreateOneDto;
}

export function getUsersFindManyDtoFixture(
  overrides: Partial<UsersFindManyDto> = {},
): UsersFindManyDto {
  return utilGetDtoFindManyFixture<
    UsersEntity,
    UsersFindManyUniqueKeysDto,
    UsersFindManySearchDto,
    UsersFindManyRelationsDto,
    UsersFindManyRangesDatesDto,
    UsersFindManyRangesNumberDto,
    UsersFindManyRangesStringDto
  >(overrides);
}

export function getUsersUpdateOneWholeDtoFixture(
  overrides: Partial<UsersUpdateOneWholeDto> = {},
): UsersUpdateOneWholeDto {
  const usersUpdateOneWholeDtoDefault: UsersUpdateOneWholeDto = {
    id: 1,
    keycloakId: 'test_keycloak_id',
    username: 'test_username_1',
    email: 'test_1@email.com',
    phoneNumber: '+18001111111',
    firstName: 'test_first_name',
    middleName: 'test_middle_name',
    lastName: 'test_last_name',
  };

  const usersUpdateOneWholeDto = Object.assign(
    usersUpdateOneWholeDtoDefault,
    overrides,
  );

  return usersUpdateOneWholeDto;
}

export function getUsersUpdateOnePartialDtoFixture(
  overrides: Partial<UsersUpdateOnePartialDto> = {},
): UsersUpdateOnePartialDto {
  return overrides;
}

export function getUsersUpdateOnePartialWithPatternDtoFixture(
  overrides: {
    ids?: UsersUpdateManyPartialWithPatternDto['ids'];
    updateOnePartialDto?: UsersUpdateManyPartialWithPatternDto['dtoUpdateOnePartial'];
  } = {},
): UsersUpdateManyPartialWithPatternDto {
  const usersUpdateOnePartialWithPatternDto: UsersUpdateManyPartialWithPatternDto =
    {
      ids: overrides.ids ?? [1, 2],
      dtoUpdateOnePartial: getUsersUpdateOnePartialDtoFixture(
        overrides.updateOnePartialDto,
      ),
    };

  return usersUpdateOnePartialWithPatternDto;
}

export function getUsersDeleteManyDtoFixture(
  overrides: Partial<UsersDeleteManyDto> = {},
): UsersDeleteManyDto {
  const usersDeleteManyDtoDefault: UsersDeleteManyDto = {
    ids: [1, 2],
  };

  const usersDeleteManyDto = Object.assign(
    usersDeleteManyDtoDefault,
    overrides,
  );

  return usersDeleteManyDto;
}
