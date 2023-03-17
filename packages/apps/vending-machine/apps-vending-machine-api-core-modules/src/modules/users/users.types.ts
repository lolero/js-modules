import { UsersEntity } from './users.entity';

export type UsersEntityType = Omit<
  UsersEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;

export type PurchaseChange = (100 | 50 | 20 | 10 | 5)[];
