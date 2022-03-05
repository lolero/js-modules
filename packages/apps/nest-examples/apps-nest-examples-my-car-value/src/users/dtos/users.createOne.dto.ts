import { IsEmail, IsString } from 'class-validator';

export class UsersCreateOneDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
