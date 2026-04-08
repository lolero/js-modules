import { beforeAll, describe, expect, it } from '@jest/globals';
import { authUtilScrypt } from './auth.util.scrypt';
import { authUtilValidatePassword } from './auth.util.validatePassword';
import { getAuthUserEntityFixture } from './auth.utils.fixtures';

describe('authUtilValidatePassword', () => {
  let password: string;
  const testSalt = 'test_salt';
  let testHash: string;
  const testPassword = getAuthUserEntityFixture().password;
  let testPasswordHashed: string;

  beforeAll(async () => {
    testHash = (await authUtilScrypt(testPassword, testSalt, 32)).toString(
      'hex',
    );
    testPasswordHashed = `${testSalt}.${testHash}`;
  });

  it('Should return true when a password matches its hash', async () => {
    password = testPassword;

    const isPasswordValid = await authUtilValidatePassword(
      password,
      testPasswordHashed,
    );

    expect(isPasswordValid).toBe(true);
  });

  it('Should return false when a password doesnt match its hash', async () => {
    password = 'incorrect_password';

    const isPasswordValid = await authUtilValidatePassword(
      password,
      testPasswordHashed,
    );

    expect(isPasswordValid).toBe(false);
  });
});
