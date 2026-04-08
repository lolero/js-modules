import { DtoFindManySearch } from '@js-modules/api-nest-utils';
import type { UsersEntity } from '../users.entity';

export class UsersFindManySearchDto extends DtoFindManySearch<UsersEntity> {}
