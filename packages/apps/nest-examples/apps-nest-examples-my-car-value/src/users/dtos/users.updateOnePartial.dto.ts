import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersUpdateOnePartialDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
