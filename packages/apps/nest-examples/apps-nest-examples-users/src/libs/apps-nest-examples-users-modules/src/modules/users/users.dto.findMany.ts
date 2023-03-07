import { RequestsDtoQueryParamsFindMany } from '@js-modules/apps-nest-utils';
import { UsersEntity } from './users.entity';
import { UsersDtoFindManyUniqueKeys } from './users.dto.findManyUniqueKeys';

export class UsersDtoFindMany extends RequestsDtoQueryParamsFindMany<
  UsersDtoFindManyUniqueKeys,
  Omit<keyof UsersEntity, 'password'>[number]
> {}
