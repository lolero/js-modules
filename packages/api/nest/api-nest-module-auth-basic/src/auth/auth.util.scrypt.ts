import { scrypt } from 'crypto';
import type { BinaryLike } from 'crypto';
import { promisify } from 'util';

export const authUtilScrypt: (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer> = promisify(scrypt);
