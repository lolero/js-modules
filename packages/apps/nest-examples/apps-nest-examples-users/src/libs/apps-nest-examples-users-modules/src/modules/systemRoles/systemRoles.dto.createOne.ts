import { IsString, Length } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';
import { SYSTEM_ROLES_NAME_MAX_LENGTH } from './systemRoles.constants';

export class SystemRolesDtoCreateOne {
  @IsString()
  @Length(1, SYSTEM_ROLES_NAME_MAX_LENGTH)
  name: SystemRolesEntity['name'];
}
