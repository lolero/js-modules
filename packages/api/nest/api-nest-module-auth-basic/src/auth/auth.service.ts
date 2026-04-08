import { randomBytes } from 'crypto';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AUTH_USERS_SERVICE } from '@js-modules/api-nest-utils';
import { AuthDtoSignin } from './auth.dto.signin';
import { AuthDtoSignup } from './auth.dto.signup';
import type { AuthUsersEntity, AuthUsersService } from './auth.types';
import { authUtilScrypt } from './auth.util.scrypt';
import { authUtilValidatePassword } from './auth.util.validatePassword';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_USERS_SERVICE) private readonly usersService: AuthUsersService,
  ) {}

  async signup(authDtoSignup: AuthDtoSignup): Promise<AuthUsersEntity> {
    const salt = randomBytes(8).toString('hex');
    const hash = await authUtilScrypt(authDtoSignup.password, salt, 32);

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

    const isPasswordValid = await authUtilValidatePassword(
      password,
      authUsersEntity.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('invalid password');
    }

    return authUsersEntity;
  }
}
