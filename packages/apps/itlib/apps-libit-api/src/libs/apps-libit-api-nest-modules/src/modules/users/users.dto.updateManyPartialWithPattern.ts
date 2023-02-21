import { UsersEntity } from './users.entity';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { RequestsDtoBodyUpdateOnePartialWithPattern } from '../../../../api-nest-utils/src';

export class UsersDtoUpdateOnePartialWithPattern extends RequestsDtoBodyUpdateOnePartialWithPattern<
  UsersEntity,
  UsersDtoUpdateOnePartial
> {}
