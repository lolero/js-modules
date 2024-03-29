import { DtoFindMany } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';
import { UsersFindManyUniqueKeysDto } from './users.findManyUniqueKeys.dto';
import { UsersFindManyRangesDatesDto } from './users.findManyRangesDates.dto';
import { UsersFindManyRangesNumberDto } from './users.findManyRangesNumber.dto';
import { UsersFindManyRangesStringDto } from './users.findManyRangesString.dto';
import { UsersFindManySearchDto } from './users.findManySearch.dto';
import { UsersFindManyRelationsDto } from './users.findManyRelations.dto';

export class UsersFindManyDto extends DtoFindMany<
  UsersEntity,
  UsersFindManyUniqueKeysDto,
  UsersFindManySearchDto,
  UsersFindManyRelationsDto,
  UsersFindManyRangesDatesDto,
  UsersFindManyRangesNumberDto,
  UsersFindManyRangesStringDto
> {}
