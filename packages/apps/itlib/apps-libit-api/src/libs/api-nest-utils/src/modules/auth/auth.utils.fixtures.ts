import omit from 'lodash/omit';
import { AuthUsersEntity } from './auth.types';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthDtoSignin } from './auth.dto.signin';

export function getAuthUserEntityFixture(
  overrides: Partial<AuthUsersEntity> = {},
): AuthUsersEntity {
  const authUserEntityDefault: AuthUsersEntity = {
    id: 'test_id',
    username: 'test_username',
    email: 'test@email.com',
    phoneNumber: '+18001234567',
    password: 'test_password',
  };

  const authUserEntity = Object.assign(authUserEntityDefault, overrides);

  return authUserEntity;
}

export function getAuthDtoSignupFixture(
  overrides: Partial<AuthDtoSignup> = {},
): AuthDtoSignup {
  const authUserEntity = getAuthUserEntityFixture();

  const authDtoSignupDefault: AuthDtoSignup = omit(authUserEntity, 'id');

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
