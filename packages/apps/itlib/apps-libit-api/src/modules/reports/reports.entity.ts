import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsersEntity } from '../users/users.entity'; // eslint-disable-line import/no-cycle

@Entity('reports')
export class ReportsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  mileage: number;

  @Column({ default: false })
  isApproved: boolean;

  // @ManyToOne(() => UsersEntity, (user) => user.reports)
  // user: UsersEntity;
}
