import { EntityUniqueKeyName } from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';

export type UsersUniqueKeyName = EntityUniqueKeyName<
  UsersEntity,
  'id' | 'keycloakId' | 'username' | 'email' | 'phoneNumber'
>;

export type UsersEntityType = Omit<
  UsersEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
