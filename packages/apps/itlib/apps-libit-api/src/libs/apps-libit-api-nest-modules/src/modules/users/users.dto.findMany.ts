import { RequestsDtoQueryParamsFindMany } from '../../../../api-nest-utils/src';
import { UsersEntity } from './users.entity';

export class UsersDtoFindMany extends RequestsDtoQueryParamsFindMany<
  Omit<keyof UsersEntity, 'password'>[number]
> {}
