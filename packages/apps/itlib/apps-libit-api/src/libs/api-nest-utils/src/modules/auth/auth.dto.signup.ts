import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { AuthUsersEntity } from './auth.types';

export class AuthDtoSignup {
  @IsString()
  @IsOptional()
  username?: AuthUsersEntity['username'];

  @IsEmail()
  email: AuthUsersEntity['email'];

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: AuthUsersEntity['phoneNumber'];

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: AuthUsersEntity['password'];
}
