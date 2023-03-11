import { IsString, IsInt } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoUpdateOneWhole {
  @IsInt()
  id: SystemRolesEntity['id'];

  @IsString()
  name: SystemRolesEntity['name'];
}
