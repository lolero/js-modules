import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequestEntity } from '@js-modules/api-nest-utils';
// eslint-disable-next-line import/no-cycle
import { UsersEntity } from '../users/users.entity';

@Entity('log_entries')
export class LogEntriesEntity implements RequestEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'title',
    type: 'varchar',
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.logEntries, {
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;
}
