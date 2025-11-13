import { DtoFindManySearch } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManySearchDto extends DtoFindManySearch<LogEntriesEntity> {}
