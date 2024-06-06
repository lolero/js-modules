import { IsOptional } from 'class-validator';
import {
  FindManyRange,
  FindManyRangesDto,
  isFindManyRange,
} from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyRangesStringDto
  implements FindManyRangesDto<LogEntriesEntity>
{
  @isFindManyRange()
  @IsOptional()
  title?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  description?: FindManyRange;
}
