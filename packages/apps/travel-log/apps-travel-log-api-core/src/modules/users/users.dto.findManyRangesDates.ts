import { IsOptional } from 'class-validator';
import {
  FindManyRangesDto,
  FindManyRange,
  isFindManyRange,
} from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';

export class UsersDtoFindManyRangesDates
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
