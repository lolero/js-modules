import { IsInt, IsOptional, IsString } from 'class-validator';
import { UsersEntity } from './users.entity';

export class UsersDtoFindManyUniqueKeys {
  @IsInt({ each: true })
  @IsOptional()
  id?: UsersEntity['id'][];

  @IsString({ each: true })
  @IsOptional()
  username?: UsersEntity['username'][];

  @IsString({ each: true })
  @IsOptional()
  email?: UsersEntity['email'][];

  @IsString({ each: true })
  @IsOptional()
  phoneNumber?: UsersEntity['phoneNumber'][];
}
