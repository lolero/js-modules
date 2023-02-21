import { EntityUniqueKeyName } from '../../../../api-nest-utils/src';
import { SystemRolesEntity } from './systemRoles.entity';

export enum SystemRolesNames {
  ADMIN = 'ADMIN',
}

export type SystemRolesUniqueKeyName = EntityUniqueKeyName<
  SystemRolesEntity,
  'id' | 'name'
>;
