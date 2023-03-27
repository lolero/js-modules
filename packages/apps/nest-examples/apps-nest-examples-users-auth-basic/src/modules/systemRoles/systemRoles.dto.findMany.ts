import { DtoFindManyIdInt } from '@js-modules/api-nest-utils';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoFindMany extends DtoFindManyIdInt<
  keyof SystemRolesEntity
> {}
