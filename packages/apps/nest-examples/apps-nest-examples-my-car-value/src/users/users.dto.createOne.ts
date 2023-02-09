import { IsEmail, IsString } from 'class-validator';

export class UsersDtoCreateOne {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
