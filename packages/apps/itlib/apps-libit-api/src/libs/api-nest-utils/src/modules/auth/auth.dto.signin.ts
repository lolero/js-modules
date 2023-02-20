import { IsString } from 'class-validator';
import type {
  AuthUsersUniqueKeyName,
  AuthUsersUniqueKeyValue,
} from './auth.types';
import { AuthUsersEntity } from './auth.types';

export class AuthDtoSignin {
  @IsString()
  uniqueKeyName: AuthUsersUniqueKeyName;

  @IsString()
  uniqueKeyValue: AuthUsersUniqueKeyValue;

  @IsString()
  password: AuthUsersEntity['password'];
}
