import { IsString } from 'class-validator';
import { UsersEntity } from './users.entity';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

export class UsersDtoUpdateOnePartialWithPattern {
  @IsString({ each: true })
  ids: UsersEntity['id'][];

  usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial;
}
