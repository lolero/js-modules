import { EntityUniqueKeyName } from '@js-modules/apps-nest-utils/src';
import { UsersEntity } from './users.entity';

export type UsersUniqueKeyName = EntityUniqueKeyName<
  UsersEntity,
  'id' | 'keycloakId' | 'username' | 'email' | 'phoneNumber'
>;

export type UsersEntityType = Omit<
  UsersEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
