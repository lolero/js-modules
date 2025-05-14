import { IsOptional } from 'class-validator';
import type {
  FindManyRange,
  FindManyRangesDto,
} from '@js-modules/api-nest-utils';
import { isFindManyRange } from '@js-modules/api-nest-utils';
import { LogEntriesEntity } from '../logEntries.entity';

export class LogEntriesFindManyRangesDateDto
  implements FindManyRangesDto<LogEntriesEntity>
{
  @isFindManyRange()
  @IsOptional()
  createdAt?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  updatedAt?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  deletedAt?: FindManyRange;
}
