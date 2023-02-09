import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { promisify } from 'util';
import { BinaryLike, randomBytes, scrypt as _scrypt } from 'crypto';
import { USERS_SERVICE } from './auth.constants';
import type { UsersEntityType, UsersServiceType } from './auth.types';

const scrypt = promisify(_scrypt) as (
  password: BinaryLike,
  salt: BinaryLike,
  keylen: number,
) => Promise<Buffer>;

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersServiceType,
  ) {}

  async signup(email: string, password: string): Promise<UsersEntityType> {
    const users = await this.usersService.findMany(email);

    if (users.length) {
      throw new BadRequestException('email already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = await scrypt(password, salt, 32);

    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.usersService.createOne(email, result);

    return user;
  }

  async signin(email: string, password: string): Promise<UsersEntityType> {
    const [user] = await this.usersService.findMany(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHashStr] = user.password.split('.');

    const providedHash = await scrypt(password, salt, 32);

    if (storedHashStr !== providedHash.toString('hex')) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
