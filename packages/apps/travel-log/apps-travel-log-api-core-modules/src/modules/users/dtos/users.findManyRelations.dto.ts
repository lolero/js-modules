import { FindManyRelationsDto } from '@js-modules/api-nest-utils';
import { UsersEntity } from '../users.entity';

export class UsersFindManyRelationsDto
  implements FindManyRelationsDto<UsersEntity> {}
