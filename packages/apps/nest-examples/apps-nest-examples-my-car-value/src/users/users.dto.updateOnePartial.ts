import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersDtoUpdateOnePartial {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
