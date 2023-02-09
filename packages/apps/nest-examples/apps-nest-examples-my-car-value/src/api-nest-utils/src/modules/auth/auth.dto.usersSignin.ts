import { IsEmail, IsString } from 'class-validator';

export class AuthDtoUsersSignin {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
