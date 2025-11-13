import { FindManyRelationsDto } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyRelationsDto
  implements FindManyRelationsDto<LogEntriesEntity> {}
