import { EntityUniqueKeyName } from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';

export type UsersUniqueKeyName = EntityUniqueKeyName<
  UsersEntity,
  'id' | 'keycloakId' | 'username' | 'email' | 'phoneNumber'
>;

export type UsersEntityType = Omit<
  UsersEntity,
  'logEntries' | 'logInsert' | 'logUpdate' | 'logRemove'
>;

export type KeycloakUser = Omit<
  UsersEntityType,
  'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
