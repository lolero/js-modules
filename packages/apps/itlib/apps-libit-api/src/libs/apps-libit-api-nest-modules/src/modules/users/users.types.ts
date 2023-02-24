import { AuthUsersUniqueKeyName } from '../../../../api-nest-utils/src';
import { UsersEntity } from './users.entity';

export type UsersUniqueKeyName = AuthUsersUniqueKeyName;

export type UsersEntityType = Omit<
  UsersEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
