import { RequestsDtoQueryParamsFindManyIdInt } from '@js-modules/apps-nest-utils';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoFindMany extends RequestsDtoQueryParamsFindManyIdInt<
  keyof SystemRolesEntity
> {}
