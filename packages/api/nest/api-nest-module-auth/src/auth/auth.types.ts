import { ClassConstructor } from 'class-transformer';
import { FactoryProvider } from '@nestjs/common/interfaces/modules/provider.interface';
// eslint-disable-next-line import/no-cycle
import { EntityUniqueKeyName } from '@js-modules/apps-nest-utils';
import { AuthDtoSignup } from './auth.dto.signup';

export interface AuthUsersEntity {
  id: string | number;
  username?: string | null;
  email: string;
  phoneNumber?: string | null;
  password: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  createdAt: Date;
  updatedAt: Date;
  systemRoles?: AuthSystemRolesEntity[];
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
  ) => Promise<AuthUsersEntity | null>;
}

export interface AuthSystemRolesEntity {
  id: string | number;
  name: string;
}

export type AuthModuleMetadata<ServiceT> = {
  module: ClassConstructor<any>;
  serviceProvider: FactoryProvider<ServiceT>;
};
