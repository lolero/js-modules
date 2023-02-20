import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { UsersEntity } from './users.entity';

export class UsersDtoUpdateOnePartial {
  @IsString()
  @IsOptional()
  username?: UsersEntity['username'];

  @IsEmail()
  @IsOptional()
  email?: UsersEntity['email'];

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: UsersEntity['phoneNumber'];

  @IsString()
  @IsOptional()
  password?: UsersEntity['password'];

  @IsString()
  @IsOptional()
  currentPassword?: UsersEntity['password'];
}
