import { IsString } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoUpdateOnePartial {
  @IsString()
  name?: SystemRolesEntity['name'];
}
