import { RequestsDtoQueryParamsFindMany } from '../../../../api-nest-utils/src';
import { UsersEntity } from './users.entity';
import { UsersDtoFindManyUniqueKeys } from './users.dto.findManyUniqueKeys';

export class UsersDtoFindMany extends RequestsDtoQueryParamsFindMany<
  UsersDtoFindManyUniqueKeys,
  Omit<keyof UsersEntity, 'password'>[number]
> {}
