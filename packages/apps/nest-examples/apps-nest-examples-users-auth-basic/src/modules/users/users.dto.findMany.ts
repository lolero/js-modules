import { DtoFindMany } from '@js-modules/api-nest-utils';
import { UsersEntity } from './users.entity';

export class UsersDtoFindMany extends DtoFindMany<UsersEntity> {}
