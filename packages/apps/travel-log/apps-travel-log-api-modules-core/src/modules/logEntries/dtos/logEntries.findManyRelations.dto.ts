import type { FindManyRelationsDto } from '@js-modules/api-nest-utils';
import type { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyRelationsDto implements FindManyRelationsDto<LogEntriesEntity> {}
