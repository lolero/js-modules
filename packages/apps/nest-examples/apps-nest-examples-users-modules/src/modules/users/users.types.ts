import { AuthUsersUniqueKeyName } from '@js-modules/api-nest-module-auth-basic';
import { UsersEntity } from './users.entity';

export type UsersUniqueKeyName = AuthUsersUniqueKeyName;

export type UsersEntityType = Omit<
  UsersEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
