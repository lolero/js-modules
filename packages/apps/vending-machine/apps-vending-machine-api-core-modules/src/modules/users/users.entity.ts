import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { ProductsEntity } from '../products/products.entity';

@Entity('users')
export class UsersEntity {
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
    name: 'first_name',
    type: 'varchar',
    nullable: true,
  })
  firstName?: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    nullable: true,
  })
  lastName?: string;

  @Column({
    name: 'balance',
    type: 'int',
  })
  balance: number;

  @OneToMany(() => ProductsEntity, (productsEntity) => productsEntity.seller)
  products: Promise<ProductsEntity[]>;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

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
