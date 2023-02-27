import { promisify } from 'util';
import { BinaryLike, scrypt as _scrypt } from 'crypto';

export const authUtilScrypt = promisify(_scrypt) as (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer>;
