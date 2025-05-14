import { IsOptional } from 'class-validator';
import type {
  FindManyRange,
  FindManyRangesDto,
} from '@js-modules/api-nest-utils';
import { isFindManyRange } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyRangesNumberDto
  implements FindManyRangesDto<LogEntriesEntity>
{
  @isFindManyRange()
  @IsOptional()
  id?: FindManyRange;
}
