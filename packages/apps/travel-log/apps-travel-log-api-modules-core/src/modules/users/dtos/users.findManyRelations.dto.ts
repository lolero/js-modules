import type { FindManyRelationsDto } from '@js-modules/api-nest-utils';
import type { UsersEntity } from '../users.entity';

export class UsersFindManyRelationsDto implements FindManyRelationsDto<UsersEntity> {}
