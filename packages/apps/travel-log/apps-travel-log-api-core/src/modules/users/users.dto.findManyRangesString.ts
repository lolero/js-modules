import { IsOptional } from 'class-validator';
import {
  FindManyRange,
  FindManyRangesDto,
  isFindManyRange,
} from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';

export class UsersDtoFindManyRangesString
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
