import omit from 'lodash/omit';
import { AuthUsersEntity } from './auth.types';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthDtoSignin } from './auth.dto.signin';

export function getAuthUserEntityFixture(
  overrides: Partial<AuthUsersEntity> = {},
): AuthUsersEntity {
  const authUserEntityDefault: AuthUsersEntity = {
    id: 1,
    username: 'test_username_1',
    email: 'test_1@email.com',
    phoneNumber: '+18001111111',
    password: 'test_password_1',
    createdAt: new Date('2000-01-01T00:00:00.000Z'),
    updatedAt: new Date('2000-01-01T00:00:00.000Z'),
    systemRoles: [],
  };

  const authUserEntity = Object.assign(authUserEntityDefault, overrides);

  return authUserEntity;
}

export function getAuthDtoSignupFixture(
  overrides: Partial<AuthDtoSignup> = {},
): AuthDtoSignup {
  const authUserEntity = getAuthUserEntityFixture();

  const authDtoSignupDefault: AuthDtoSignup = omit(
    authUserEntity,
    'id',
    'createdAt',
    'updatedAt',
  );

  const authDtoSignup = Object.assign(authDtoSignupDefault, overrides);

  return authDtoSignup;
}

export function getAuthDtoSigninFixture(
  overrides: Partial<AuthDtoSignin> = {},
): AuthDtoSignin {
  const authUserEntity = getAuthUserEntityFixture();

  const authDtoSigninDefault: AuthDtoSignin = {
    uniqueKeyName: 'username',
    uniqueKeyValue: authUserEntity.username,
    password: authUserEntity.password,
  };

  const authDtoSignin = Object.assign(authDtoSigninDefault, overrides);

  return authDtoSignin;
}
