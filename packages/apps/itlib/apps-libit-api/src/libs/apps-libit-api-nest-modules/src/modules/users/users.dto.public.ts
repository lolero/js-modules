import { IsEmail, IsString } from 'class-validator';

export class UsersDtoPublic {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
