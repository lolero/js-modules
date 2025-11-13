import { IsInt, IsOptional } from 'class-validator';
import { FindManyUniqueKeysDto } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyUniqueKeysDto
  implements FindManyUniqueKeysDto<LogEntriesEntity>
{
  @IsInt({ each: true })
  @IsOptional()
  id?: LogEntriesEntity['id'][];
}
