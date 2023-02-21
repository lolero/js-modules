import { RequestsDtoQueryParamsFindMany } from '../../../../api-nest-utils/src';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoFindMany extends RequestsDtoQueryParamsFindMany<
  keyof SystemRolesEntity
> {}
