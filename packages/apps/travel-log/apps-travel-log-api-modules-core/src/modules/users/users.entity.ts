import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { RequestEntity } from '@js-modules/api-nest-utils';
// eslint-disable-next-line import-x/no-cycle
import { LogEntriesEntity } from '../logEntries/logEntries.entity';

@Entity('users')
export class UsersEntity implements RequestEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'keycloak_id',
    type: 'uuid',
    unique: true,
  })
  keycloakId: string;

  @Column({
    name: 'username',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  username?: string;

  @Column({
    name: 'email',
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: true,
    unique: true,
  })
  phoneNumber?: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    nullable: true,
  })
  firstName?: string;

  @Column({
    name: 'middle_name',
    type: 'varchar',
    nullable: true,
  })
  middleName?: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
  })
  lastName?: string;

  @OneToMany(
    () => LogEntriesEntity,
    (logEntriesEntity) => logEntriesEntity.user,
  )
  logEntries: Relation<Promise<LogEntriesEntity[]>>;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;

  @AfterInsert()
  logInsert(): void {}

  @AfterUpdate()
  logUpdate(): void {}

  @AfterRemove()
  logRemove(): void {}
}
