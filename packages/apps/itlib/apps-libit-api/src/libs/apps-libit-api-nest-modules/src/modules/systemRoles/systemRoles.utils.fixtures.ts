import omit from 'lodash/omit';
import { SystemRolesDtoUpdateOneWhole } from './systemRoles.dto.updateOneWhole';
import { SystemRolesDtoFindMany } from './systemRoles.dto.findMany';
import { getRequestsDtoQueryParamsFindManyFixture } from '../../../../api-nest-utils/src';
import { SystemRolesDtoCreateOne } from './systemRoles.dto.createOne';
import { SystemRolesDtoUpdateOnePartial } from './systemRoles.dto.updateOnePartial';
import { SystemRolesDtoUpdateOnePartialWithPattern } from './systemRoles.dto.updateManyPartialWithPattern';
import { SystemRolesDtoDeleteMany } from './systemRoles.dto.deleteMany';

export function getSystemRolesEntityFixture(
  overrides: Partial<SystemRolesDtoUpdateOneWhole> = {},
): SystemRolesDtoUpdateOneWhole {
  const systemRolesEntityDefault: SystemRolesDtoUpdateOneWhole = {
    id: 'test_id',
    name: 'test_name',
  };

  const systemRolesEntity = Object.assign(systemRolesEntityDefault, overrides);

  return systemRolesEntity;
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
    SystemRolesDtoFindMany['sortBy']
  >(overrides);
}

export function getSystemRolesDtoUpdateOneWholeFixture(
  overrides: Partial<SystemRolesDtoUpdateOneWhole> = {},
): SystemRolesDtoUpdateOneWhole {
  return getSystemRolesEntityFixture(overrides);
}

export function getSystemRolesDtoUpdateOnePartialFixture(
  overrides: Partial<SystemRolesDtoUpdateOnePartial> = {},
): SystemRolesDtoUpdateOnePartial {
  const systemRolesDtoUpdateOnePartialDefault: SystemRolesDtoUpdateOnePartial =
    {
      name: 'test_name_new',
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
      ids: overrides.ids ?? ['test_id_1', 'test_id_2'],
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
    ids: ['test_id_1', 'test_id_2'],
  };

  const systemRolesDtoDeleteMany = Object.assign(
    systemRolesDtoDeleteManyDefault,
    overrides,
  );

  return systemRolesDtoDeleteMany;
}
