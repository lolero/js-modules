import { ClassConstructor } from 'class-transformer';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
// eslint-disable-next-line import/no-cycle
import { AuthDtoSignup } from './auth.dto.signup';
import { EntityUniqueKeyName } from '../../requests/requests.types';

export interface AuthUsersEntity {
  id: string | number;
  username?: string | null;
  email: string;
  phoneNumber?: string | null;
  password: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
}

export type AuthUsersUniqueKeyName = EntityUniqueKeyName<
  AuthUsersEntity,
  'id' | 'username' | 'email' | 'phoneNumber'
>;
export type AuthUsersUniqueKeyValue = string | number;

export interface AuthUsersService {
  createMany: (
    authDtoSignupArray: AuthDtoSignup[],
  ) => Promise<AuthUsersEntity[]>;
  findOne: (
    uniqueKeyName: AuthUsersUniqueKeyName,
    uniqueKeyValue: AuthUsersUniqueKeyValue,
  ) => Promise<AuthUsersEntity>;
}

export interface AuthSystemRolesEntity {
  id: string | number;
  name: string;
}

export type AuthModuleMetadata<ServiceT> = {
  module: ClassConstructor<any>;
  serviceProvider: FactoryProvider<ServiceT>;
};
