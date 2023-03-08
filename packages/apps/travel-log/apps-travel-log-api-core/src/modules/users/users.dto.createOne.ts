import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { UsersEntity } from './users.entity';

export class UsersDtoCreateOne {
  @IsUUID()
  @IsOptional()
  keycloakId: UsersEntity['keycloakId'];

  @IsString()
  @IsOptional()
  username?: UsersEntity['username'];

  @IsEmail()
  email: UsersEntity['email'];

  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: UsersEntity['phoneNumber'];

  @IsString()
  @IsOptional()
  firstName?: UsersEntity['firstName'];

  @IsString()
  @IsOptional()
  middleName?: UsersEntity['middleName'];

  @IsString()
  @IsOptional()
  lastName?: UsersEntity['lastName'];
}
