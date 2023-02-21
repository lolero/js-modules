import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AuthSystemRolesEntity } from '../../../../api-nest-utils/src';

@Entity('system_roles')
export class SystemRolesEntity implements AuthSystemRolesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  name: string;
}
