import { IsString } from 'class-validator';
import { UsersEntity } from './users.entity';

export class UsersDtoDeleteMany {
  @IsString({ each: true })
  ids: UsersEntity['id'][];
}
