import { RequestsDtoQueryParamsFindManyIdInt } from '@js-modules/api-nest-utils';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoFindMany extends RequestsDtoQueryParamsFindManyIdInt<
  keyof SystemRolesEntity
> {}
