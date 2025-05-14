import { IsOptional } from 'class-validator';
import type {
  FindManyRange,
  FindManyRangesDto,
} from '@js-modules/api-nest-utils';
import { isFindManyRange } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';

export class UsersFindManyRangesDateDto
  implements FindManyRangesDto<UsersEntity>
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
