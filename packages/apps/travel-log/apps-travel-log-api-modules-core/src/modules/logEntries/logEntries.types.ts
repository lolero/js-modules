import { EntityUniqueKeyName } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from './logEntries.entity';

export type LogEntriesUniqueKeyName = EntityUniqueKeyName<
  LogEntriesEntity,
  'id'
>;

export type LogEntriesEntityType = Omit<
  LogEntriesEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
