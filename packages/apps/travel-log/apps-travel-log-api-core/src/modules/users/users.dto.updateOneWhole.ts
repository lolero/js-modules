import { IsInt } from 'class-validator';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';

export class UsersDtoUpdateOneWhole extends UsersDtoCreateOne {
  @IsInt()
  id: UsersEntity['id'];
}
