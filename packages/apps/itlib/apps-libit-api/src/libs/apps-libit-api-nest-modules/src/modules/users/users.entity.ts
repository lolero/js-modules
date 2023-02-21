import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthUsersEntity } from '../../../../api-nest-utils/src';
import { SystemRolesEntity } from '../systemRoles/systemRoles.entity';

@Entity('users')
export class UsersEntity implements AuthUsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: true,
  })
  username?: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phoneNumber?: string;

  @Column()
  password: string;

  @ManyToMany(() => SystemRolesEntity, {
    eager: true,
  })
  @JoinTable({
    name: 'users__system_roles',
    joinColumn: {
      name: 'userId',
    },
    inverseJoinColumn: {
      name: 'systemRoleId',
    },
  })
  systemRoles: SystemRolesEntity[];

  @AfterInsert()
  logInsert() {
    console.log('inserted user with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated user with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed user with id', this.id);
  }
}
