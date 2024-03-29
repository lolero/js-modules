import { IsOptional } from 'class-validator';
import {
  FindManyRange,
  FindManyRangesDto,
  isFindManyRange,
} from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';

export class UsersFindManyRangesNumberDto
  implements FindManyRangesDto<UsersEntity>
{
  @isFindManyRange()
  @IsOptional()
  id?: FindManyRange;
}
