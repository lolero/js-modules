import { IsOptional, IsString, IsUUID } from 'class-validator';
import { UsersEntity } from './users.entity';
import { UsersDtoCreateOne } from './users.dto.createOne';

export class UsersDtoUpdateOneWhole extends UsersDtoCreateOne {
  @IsUUID()
  id: UsersEntity['id'];

  @IsString()
  @IsOptional()
  currentPassword?: UsersEntity['password'];
}
