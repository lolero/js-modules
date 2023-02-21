import { IsString, IsUUID } from 'class-validator';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoUpdateOneWhole {
  @IsUUID()
  id: SystemRolesEntity['id'];

  @IsString()
  name: SystemRolesEntity['name'];
}
