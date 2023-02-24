import { IsOptional, IsString, IsInt, Length } from 'class-validator';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { USERS_PASSWORD_MAX_LENGTH } from './users.constants';

export class UsersDtoUpdateOneWhole extends UsersDtoCreateOne {
  @IsInt()
  id: UsersEntity['id'];

  @IsString()
  @Length(1, USERS_PASSWORD_MAX_LENGTH)
  @IsOptional()
  currentPassword?: UsersEntity['password'];
}
