import { IsOptional } from 'class-validator';
import {
  FindManyRange,
  FindManyRangesDto,
  isFindManyRange,
} from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyRangesNumberDto
  implements FindManyRangesDto<LogEntriesEntity>
{
  @isFindManyRange()
  @IsOptional()
  id?: FindManyRange;
}
