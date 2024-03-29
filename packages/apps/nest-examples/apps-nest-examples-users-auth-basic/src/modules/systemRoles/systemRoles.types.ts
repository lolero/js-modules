import { EntityUniqueKeyName } from '@js-modules/api-nest-utils';
// eslint-disable-next-line import/no-cycle
import { SystemRolesEntity } from './systemRoles.entity';

export enum SystemRolesName {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type SystemRolesUniqueKeyName = EntityUniqueKeyName<
  SystemRolesEntity,
  'id' | 'name'
>;

export type SystemRolesEntityType = Omit<SystemRolesEntity, ''>;
