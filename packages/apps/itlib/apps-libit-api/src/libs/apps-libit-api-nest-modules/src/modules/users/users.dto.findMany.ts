import { RequestsDtoQueryParamsFindManyIdInt } from '../../../../api-nest-utils/src';
import { UsersEntity } from './users.entity';

export class UsersDtoFindMany extends RequestsDtoQueryParamsFindManyIdInt<
  Omit<keyof UsersEntity, 'password'>[number]
> {}
