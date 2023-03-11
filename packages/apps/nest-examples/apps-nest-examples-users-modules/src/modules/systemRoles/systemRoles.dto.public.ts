import { Expose } from 'class-transformer';
import { SystemRolesEntity } from './systemRoles.entity';

export class SystemRolesDtoPublic {
  @Expose()
  id: SystemRolesEntity['id'];

  @Expose()
  name: SystemRolesEntity['name'];
}
