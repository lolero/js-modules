import { RequestsDtoQueryParamsFindMany } from '@js-modules/apps-nest-utils';
import { UsersEntity } from './users.entity';
import { UsersDtoFindManyUniqueKeys } from './users.dto.findManyUniqueKeys';

export class UsersDtoFindMany extends RequestsDtoQueryParamsFindMany<
  UsersDtoFindManyUniqueKeys,
  (keyof UsersEntity)[number]
> {}
