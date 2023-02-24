import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { UsersEntity } from './users.entity';
import {
  USERS_EMAIL_MAX_LENGTH,
  USERS_PASSWORD_MAX_LENGTH,
  USERS_PHONE_NUMBER_MAX_LENGTH,
  USERS_USERNAME_MAX_LENGTH,
} from './users.constants';

export class UsersDtoUpdateOnePartial {
  @IsString()
  @Length(1, USERS_USERNAME_MAX_LENGTH)
  @IsOptional()
  username?: UsersEntity['username'];

  @IsEmail()
  @Length(1, USERS_EMAIL_MAX_LENGTH)
  @IsOptional()
  email?: UsersEntity['email'];

  @IsPhoneNumber()
  @Length(1, USERS_PHONE_NUMBER_MAX_LENGTH)
  @IsOptional()
  phoneNumber?: UsersEntity['phoneNumber'];

  @IsString()
  @Length(1, USERS_PASSWORD_MAX_LENGTH)
  @IsOptional()
  password?: UsersEntity['password'];

  @IsString()
  @Length(1, USERS_PASSWORD_MAX_LENGTH)
  @IsOptional()
  currentPassword?: UsersEntity['password'];
}
