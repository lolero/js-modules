import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthSystemRolesEntity } from '@js-modules/api-nest-module-auth-basic';
import { SYSTEM_ROLES_NAME_MAX_LENGTH } from './systemRoles.constants';
// eslint-disable-next-line import/no-cycle
import { SystemRolesName } from './systemRoles.types';

@Entity('system_roles')
export class SystemRolesEntity implements AuthSystemRolesEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: SYSTEM_ROLES_NAME_MAX_LENGTH,
    unique: true,
  })
  name: SystemRolesName;
}
