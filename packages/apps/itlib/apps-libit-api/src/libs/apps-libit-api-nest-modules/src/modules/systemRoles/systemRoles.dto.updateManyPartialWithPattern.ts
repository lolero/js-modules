import { SystemRolesEntity } from './systemRoles.entity';
import { SystemRolesDtoUpdateOnePartial } from './systemRoles.dto.updateOnePartial';
import { RequestsDtoBodyUpdateOnePartialWithPattern } from '../../../../api-nest-utils/src';

export class SystemRolesDtoUpdateOnePartialWithPattern extends RequestsDtoBodyUpdateOnePartialWithPattern<
  SystemRolesEntity,
  SystemRolesDtoUpdateOnePartial
> {}
