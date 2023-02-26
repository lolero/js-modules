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
import {
  USERS_EMAIL_MAX_LENGTH,
  USERS_PASSWORD_MAX_LENGTH,
  USERS_PHONE_NUMBER_MAX_LENGTH,
  USERS_USERNAME_MAX_LENGTH,
} from './users.constants';

@Entity('users')
export class UsersEntity implements AuthUsersEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'username',
    type: 'varchar',
    length: USERS_USERNAME_MAX_LENGTH,
    nullable: true,
    unique: true,
  })
  username?: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: USERS_EMAIL_MAX_LENGTH,
    unique: true,
  })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: USERS_PHONE_NUMBER_MAX_LENGTH,
    nullable: true,
    unique: true,
  })
  phoneNumber?: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: USERS_PASSWORD_MAX_LENGTH,
  })
  password: string;

  @ManyToMany(() => SystemRolesEntity, {
    eager: true,
  })
  @JoinTable({
    name: 'users__system_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'system_role_id',
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