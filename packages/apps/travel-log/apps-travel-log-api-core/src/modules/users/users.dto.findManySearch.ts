import { DtoFindManySearch } from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';

export class UsersDtoFindManySearch extends DtoFindManySearch<UsersEntity> {}
