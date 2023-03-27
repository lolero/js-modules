import { DtoFindMany } from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';
import { UsersDtoFindManyUniqueKeys } from './users.dto.findManyUniqueKeys';
import { UsersDtoFindManyRangesDates } from './users.dto.findManyRangesDates';
import { UsersDtoFindManyRangesNumber } from './users.dto.findManyRangesNumber';
import { UsersDtoFindManyRangesString } from './users.dto.findManyRangesString';
import { UsersDtoFindManySearch } from './users.dto.findManySearch';
import { UsersDtoFindManyRelations } from './users.dto.findManyRelations';

export class UsersDtoFindMany extends DtoFindMany<
  UsersEntity,
  UsersDtoFindManyUniqueKeys,
  UsersDtoFindManySearch,
  UsersDtoFindManyRelations,
  UsersDtoFindManyRangesDates,
  UsersDtoFindManyRangesNumber,
  UsersDtoFindManyRangesString
> {}
