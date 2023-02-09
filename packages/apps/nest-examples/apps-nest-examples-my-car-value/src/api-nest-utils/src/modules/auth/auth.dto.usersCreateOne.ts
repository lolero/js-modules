import { IsEmail, IsString } from 'class-validator';

export class AuthDtoUsersCreateOne {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
