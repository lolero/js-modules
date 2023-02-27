import { authUtilScrypt } from './auth.util.scrypt';

export async function authUtilValidatePassword(
  password: string,
  passwordHashed: string,
): Promise<boolean> {
  const [salt, storedHashStr] = passwordHashed.split('.');

  const providedHash = await authUtilScrypt(password, salt, 32);
  const providedHashStr = providedHash.toString('hex');

  const isPasswordValid = storedHashStr === providedHashStr;

  return isPasswordValid;
}
