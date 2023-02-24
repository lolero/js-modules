import { RequestsDtoQueryParamsFindManyIdInt } from '../../../../api-nest-utils/src';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoFindMany extends RequestsDtoQueryParamsFindManyIdInt<
  keyof SystemRolesEntity
> {}
