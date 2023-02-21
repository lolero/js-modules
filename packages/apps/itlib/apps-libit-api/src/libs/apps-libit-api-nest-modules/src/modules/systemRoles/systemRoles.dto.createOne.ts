import { IsString } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoCreateOne {
  @IsString()
  name: SystemRolesEntity['name'];
}
