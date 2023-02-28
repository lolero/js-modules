import omit from 'lodash/omit';
import { SystemRolesDtoUpdateOneWhole } from './systemRoles.dto.updateOneWhole';
import { SystemRolesDtoFindMany } from './systemRoles.dto.findMany';
import { getRequestsDtoQueryParamsFindManyFixture } from '../../../../api-nest-utils/src';
import { SystemRolesDtoCreateOne } from './systemRoles.dto.createOne';
import { SystemRolesDtoUpdateOnePartial } from './systemRoles.dto.updateOnePartial';
import { SystemRolesDtoUpdateOnePartialWithPattern } from './systemRoles.dto.updateManyPartialWithPattern';
import { SystemRolesDtoDeleteMany } from './systemRoles.dto.deleteMany';
import { SystemRolesEntityType, SystemRolesName } from './systemRoles.types';
import { SystemRolesEntity } from './systemRoles.entity';
import { SystemRolesDtoFindManyUniqueKeys } from './systemRoles.dto.findManyUniqueKeys';

export function getSystemRolesEntityFixture(
  overrides: Partial<SystemRolesEntityType> = {},
): SystemRolesEntity {
  const systemRolesEntityDefault: SystemRolesEntityType = {
    id: 1,
    name: SystemRolesName.USER,
  };

  const systemRolesEntity = Object.assign(systemRolesEntityDefault, overrides);

  return systemRolesEntity as SystemRolesEntity;
}

export function getSystemRolesDtoCreateOneFixture(
  overrides: Partial<SystemRolesDtoCreateOne> = {},
): SystemRolesDtoCreateOne {
  const systemRolesEntity = getSystemRolesEntityFixture();

  const systemRolesEntityDefault: SystemRolesDtoCreateOne = omit(
    systemRolesEntity,
    'id',
  );

  const systemRolesDtoCreateOne = Object.assign(
    systemRolesEntityDefault,
    overrides,
  );

  return systemRolesDtoCreateOne;
}

export function getSystemRolesDtoFindManyFixture(
  overrides: Partial<SystemRolesDtoFindMany> = {},
): SystemRolesDtoFindMany {
  return getRequestsDtoQueryParamsFindManyFixture<
    SystemRolesDtoFindManyUniqueKeys,
    SystemRolesDtoFindMany['sortBy']
  >(overrides);
}

export function getSystemRolesDtoUpdateOneWholeFixture(
  overrides: Partial<SystemRolesDtoUpdateOneWhole> = {},
): SystemRolesDtoUpdateOneWhole {
  const systemRolesDtoUpdateOneWholeDefault: SystemRolesDtoUpdateOneWhole = {
    id: 1,
    name: SystemRolesName.USER,
  };

  const systemRolesDtoUpdateOneWhole = Object.assign(
    systemRolesDtoUpdateOneWholeDefault,
    overrides,
  );

  return systemRolesDtoUpdateOneWhole;
}

export function getSystemRolesDtoUpdateOnePartialFixture(
  overrides: Partial<SystemRolesDtoUpdateOnePartial> = {},
): SystemRolesDtoUpdateOnePartial {
  const systemRolesDtoUpdateOnePartialDefault: SystemRolesDtoUpdateOnePartial =
    {
      name: SystemRolesName.ADMIN,
    };

  const systemRolesDtoUpdateOnePartial = Object.assign(
    systemRolesDtoUpdateOnePartialDefault,
    overrides,
  );

  return systemRolesDtoUpdateOnePartial;
}

export function getSystemRolesDtoUpdateOnePartialWithPatternFixture(
  overrides: {
    ids?: SystemRolesDtoUpdateOnePartialWithPattern['ids'];
    dtoUpdateOnePartial?: SystemRolesDtoUpdateOnePartialWithPattern['dtoUpdateOnePartial'];
  } = {},
): SystemRolesDtoUpdateOnePartialWithPattern {
  const systemRolesDtoUpdateOnePartialWithPattern: SystemRolesDtoUpdateOnePartialWithPattern =
    {
      ids: overrides.ids ?? [1, 2],
      dtoUpdateOnePartial: getSystemRolesDtoUpdateOnePartialFixture(
        overrides.dtoUpdateOnePartial,
      ),
    };

  return systemRolesDtoUpdateOnePartialWithPattern;
}

export function getSystemRolesDtoDeleteManyFixture(
  overrides: Partial<SystemRolesDtoDeleteMany> = {},
): SystemRolesDtoDeleteMany {
  const systemRolesDtoDeleteManyDefault: SystemRolesDtoDeleteMany = {
    ids: [1, 2],
  };

  const systemRolesDtoDeleteMany = Object.assign(
    systemRolesDtoDeleteManyDefault,
    overrides,
  );

  return systemRolesDtoDeleteMany;
}
