// eslint-disable-next-line import/no-cycle
import { AuthDtoSignup } from './auth.dto.signup';

export interface AuthUsersEntity {
  id: string | number;
  username?: string | null;
  email: string;
  phoneNumber?: string | null;
  password: string;
}

export type UsersUniqueKeyName = keyof Pick<
  AuthUsersEntity,
  'id' | 'username' | 'email' | 'phoneNumber'
>;
export type UsersUniqueKeyValue = string | number;

export interface AuthUsersService {
  createOne: (authDtoSignup: AuthDtoSignup) => Promise<AuthUsersEntity>;
  findOne: (
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: UsersUniqueKeyValue,
  ) => Promise<AuthUsersEntity>;
}
