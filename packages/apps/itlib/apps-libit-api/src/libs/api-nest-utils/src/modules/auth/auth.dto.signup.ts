import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';
// eslint-disable-next-line import/no-cycle
import { AuthUsersEntity } from './auth.types';

export class AuthDtoSignup {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  username?: AuthUsersEntity['username'];

  @IsEmail()
  email: AuthUsersEntity['email'];

  @IsPhoneNumber()
  @ValidateIf((object, value) => value !== null)
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
