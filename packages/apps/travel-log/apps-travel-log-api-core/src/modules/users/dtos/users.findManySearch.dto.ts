import { DtoFindManySearch } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';

export class UsersFindManySearchDto extends DtoFindManySearch<UsersEntity> {}
