import { IsOptional, IsString, Length } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';
import { SYSTEM_ROLES_NAME_MAX_LENGTH } from './systemRoles.constants';

export class SystemRolesDtoUpdateOnePartial {
  @IsString()
  @Length(1, SYSTEM_ROLES_NAME_MAX_LENGTH)
  @IsOptional()
  name?: SystemRolesEntity['name'];
}
