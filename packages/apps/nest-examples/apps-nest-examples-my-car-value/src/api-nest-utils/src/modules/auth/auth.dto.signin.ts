import { IsString } from 'class-validator';
import type { UsersUniqueKeyName, UsersUniqueKeyValue } from './auth.types';
import { AuthUsersEntity } from './auth.types';

export class AuthDtoSignin {
  @IsString()
  uniqueKeyName: UsersUniqueKeyName;

  @IsString()
  uniqueKeyValue: UsersUniqueKeyValue;

  @IsString()
  password: AuthUsersEntity['password'];
}
