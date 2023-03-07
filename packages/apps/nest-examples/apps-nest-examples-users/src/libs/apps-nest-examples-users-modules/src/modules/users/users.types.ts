import { AuthUsersUniqueKeyName } from '@js-modules/apps-nest-module-auth';
import { UsersEntity } from './users.entity';

export type UsersUniqueKeyName = AuthUsersUniqueKeyName;

export type UsersEntityType = Omit<
  UsersEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
