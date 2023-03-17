import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { UsersEntity } from '../users/users.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
  })
  name: string;

  @Column({
    name: 'cost',
    type: 'int',
  })
  cost: number;

  @Column({
    name: 'amount_available',
    type: 'int',
  })
  amountAvailable: number;

  @ManyToOne(() => UsersEntity, (usersEntity) => usersEntity.products, {
    eager: true,
  })
  @JoinColumn({
    name: 'seller_id',
  })
  seller: UsersEntity;

  @AfterInsert()
  logInsert() {
    console.log('inserted product with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('updated product with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('removed product with id', this.id);
  }
}
