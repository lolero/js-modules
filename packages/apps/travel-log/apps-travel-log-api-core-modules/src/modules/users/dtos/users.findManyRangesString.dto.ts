import { IsOptional } from 'class-validator';
import type {
  FindManyRange,
  FindManyRangesDto,
} from '@js-modules/api-nest-utils';
import { isFindManyRange } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';

export class UsersFindManyRangesStringDto
  implements FindManyRangesDto<UsersEntity>
{
  @isFindManyRange()
  @IsOptional()
  username?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  email?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  phoneNumber?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  firstName?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  middleName?: FindManyRange;

  @isFindManyRange()
  @IsOptional()
  lastName?: FindManyRange;
}
