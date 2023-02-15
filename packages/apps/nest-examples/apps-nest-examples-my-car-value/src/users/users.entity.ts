import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuthUsersEntity } from '../api-nest-utils/src';
import { ReportsEntity } from '../reports/reports.entity'; // eslint-disable-line import/no-cycle

@Entity('users')
export class UsersEntity implements AuthUsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
    nullable: true,
  })
  phoneNumber: string;

  @Column()
  password: string;

  @OneToMany(() => ReportsEntity, (report) => report.user)
  reports: ReportsEntity[];

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
