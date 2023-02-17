import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { BinaryLike, randomBytes, scrypt as _scrypt } from 'crypto';
import { USERS_SERVICE } from './auth.constants';
import type { AuthUsersEntity, AuthUsersService } from './auth.types';
import { UsersUniqueKeyName, UsersUniqueKeyValue } from './auth.types';
import { AuthDtoSignup } from './auth.dto.signup';

export const scrypt = promisify(_scrypt) as (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer>;

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: AuthUsersService,
  ) {}

  async signup(authDtoSignup: AuthDtoSignup): Promise<AuthUsersEntity> {
    const salt = randomBytes(8).toString('hex');
    const hash = await scrypt(authDtoSignup.password, salt, 32);

    const result = `${salt}.${hash.toString('hex')}`;
    const authDtoSignupHashed = {
      ...authDtoSignup,
      password: result,
    };

    const user = await this.usersService.createOne(authDtoSignupHashed);

    return user;
  }

  async signin(
    uniqueKeyName: UsersUniqueKeyName,
    uniqueKeyValue: UsersUniqueKeyValue,
    password: string,
  ): Promise<AuthUsersEntity> {
    const user = await this.usersService.findOne(uniqueKeyName, uniqueKeyValue);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHashStr] = user.password.split('.');

    const providedHash = await scrypt(password, salt, 32);
    const providedHashStr = providedHash.toString('hex');

    if (storedHashStr !== providedHashStr) {
      throw new BadRequestException('invalid password');
    }

    return user;
  }
}
