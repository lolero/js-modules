import { DtoFindManySearch } from '@js-modules/api-nest-utils';
import type { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManySearchDto extends DtoFindManySearch<LogEntriesEntity> {}
