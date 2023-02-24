import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { BinaryLike, randomBytes, scrypt as _scrypt } from 'crypto';
import { AUTH_USERS_SERVICE } from './auth.constants';
import type { AuthUsersEntity, AuthUsersService } from './auth.types';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthDtoSignin } from './auth.dto.signin';

export const scrypt = promisify(_scrypt) as (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer>;

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_USERS_SERVICE) private readonly usersService: AuthUsersService,
  ) {}

  async signup(authDtoSignup: AuthDtoSignup): Promise<AuthUsersEntity> {
    const salt = randomBytes(8).toString('hex');
    const hash = await scrypt(authDtoSignup.password, salt, 32);

    const result = `${salt}.${hash.toString('hex')}`;
    const authDtoSignupHashed = {
      ...authDtoSignup,
      password: result,
    };

    const authUsersEntities = await this.usersService.createMany([
      authDtoSignupHashed,
    ]);

    return authUsersEntities[0];
  }

  async signin(authDtoSignin: AuthDtoSignin): Promise<AuthUsersEntity> {
    const { uniqueKeyName, uniqueKeyValue, password } = authDtoSignin;

    const authUsersEntity = await this.usersService.findOne(
      uniqueKeyName,
      uniqueKeyValue,
    );

    if (!authUsersEntity) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHashStr] = authUsersEntity.password.split('.');

    const providedHash = await scrypt(password, salt, 32);
    const providedHashStr = providedHash.toString('hex');

    if (storedHashStr !== providedHashStr) {
      throw new BadRequestException('invalid password');
    }

    return authUsersEntity;
  }
}
