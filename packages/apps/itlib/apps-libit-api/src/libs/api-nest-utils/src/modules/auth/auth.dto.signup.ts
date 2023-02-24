import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { AuthUsersEntity } from './auth.types';
import {
  AUTH_USERS_EMAIL_MAX_LENGTH,
  AUTH_USERS_PASSWORD_MAX_LENGTH,
  AUTH_USERS_PHONE_NUMBER_MAX_LENGTH,
  AUTH_USERS_USERNAME_MAX_LENGTH,
} from './auth.constants';

export class AuthDtoSignup {
  @IsString()
  @Length(1, AUTH_USERS_USERNAME_MAX_LENGTH)
  @IsOptional()
  username?: AuthUsersEntity['username'];

  @IsEmail()
  @Length(1, AUTH_USERS_EMAIL_MAX_LENGTH)
  email: AuthUsersEntity['email'];

  @IsPhoneNumber()
  @Length(1, AUTH_USERS_PHONE_NUMBER_MAX_LENGTH)
  @IsOptional()
  phoneNumber?: AuthUsersEntity['phoneNumber'];

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(1, AUTH_USERS_PASSWORD_MAX_LENGTH)
  password: AuthUsersEntity['password'];
}
