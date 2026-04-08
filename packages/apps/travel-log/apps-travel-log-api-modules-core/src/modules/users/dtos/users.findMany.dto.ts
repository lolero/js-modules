import { utilCreateFindManyDto } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';
import { UsersFindManyRangesDateDto } from './users.findManyRangesDate.dto';
import { UsersFindManyRangesNumberDto } from './users.findManyRangesNumber.dto';
import { UsersFindManyRangesStringDto } from './users.findManyRangesString.dto';
import { UsersFindManyRelationsDto } from './users.findManyRelations.dto';
import { UsersFindManySearchDto } from './users.findManySearch.dto';
import { UsersFindManyUniqueKeysDto } from './users.findManyUniqueKeys.dto';

export class UsersFindManyDto extends utilCreateFindManyDto(
  UsersEntity,
  UsersFindManyUniqueKeysDto,
  UsersFindManySearchDto,
  UsersFindManyRelationsDto,
  UsersFindManyRangesDateDto,
  UsersFindManyRangesNumberDto,
  UsersFindManyRangesStringDto,
) {}
