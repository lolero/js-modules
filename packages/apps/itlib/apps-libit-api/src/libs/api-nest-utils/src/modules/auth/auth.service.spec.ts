import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService, scrypt } from './auth.service';
import { AuthUsersEntity, AuthUsersService } from './auth.types';
import { USERS_SERVICE } from './auth.constants';
import { AuthDtoSignup } from './auth.dto.signup';
import {
  getAuthDtoSigninFixture,
  getAuthDtoSignupFixture,
  getAuthUserEntityFixture,
} from './auth.utils.fixtures';
import { AuthDtoSignin } from './auth.dto.signin';

describe('AuthService', () => {
  let testAuthUserEntity: AuthUsersEntity;
  let testAuthDtoSignup: AuthDtoSignup;
  let authService: AuthService;
  let usersServiceCreateOneMock: jest.Mock;
  let usersServiceFindOneMock: jest.Mock;
  let usersServiceMock: Partial<AuthUsersService>;

  beforeEach(async () => {
    testAuthUserEntity = getAuthUserEntityFixture();
    testAuthDtoSignup = getAuthDtoSignupFixture();
    usersServiceCreateOneMock = jest.fn();
    usersServiceFindOneMock = jest.fn();
    usersServiceMock = {
      createOne: usersServiceCreateOneMock,
      findOne: usersServiceFindOneMock,
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: USERS_SERVICE,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('Should call usersService.createOne, with a salted and hashed password, and return the created user', async () => {
      usersServiceCreateOneMock.mockReturnValue(testAuthUserEntity);

      const authUsersEntity = await authService.signup(testAuthDtoSignup);

      expect(usersServiceCreateOneMock).toHaveBeenNthCalledWith(1, {
        ...testAuthDtoSignup,
        password: expect.anything(),
      });

      const { password } = usersServiceCreateOneMock.mock.calls[0][0];
      expect(password).not.toBe(testAuthDtoSignup.password);

      const [salt, hash] = password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();

      expect(authUsersEntity).toEqual(testAuthUserEntity);
    });
  });

  describe('signin', () => {
    const testSalt = 'test_salt';
    let testAuthDtoSignin: AuthDtoSignin;

    beforeEach(() => {
      testAuthDtoSignin = getAuthDtoSigninFixture();
    });

    it('Should call usersService.findOne and throw an error if user is not found', async () => {
      usersServiceFindOneMock.mockReturnValue(null);

      await expect(authService.signin(testAuthDtoSignin)).rejects.toThrow(
        NotFoundException,
      );
      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthUserEntity.username,
      );
    });

    it('Should call usersService.findOne with an existing unique key, validate a correct password, and return the authenticated user', async () => {
      const testHash = (
        await scrypt(testAuthDtoSignin.password, testSalt, 32)
      ).toString('hex');
      const passwordHashed = `${testSalt}.${testHash}`;

      const userEntityHashed = {
        ...testAuthDtoSignup,
        id: testAuthUserEntity.id,
        password: passwordHashed,
      };

      usersServiceFindOneMock.mockReturnValue(userEntityHashed);

      const authUsersEntity = await authService.signin(testAuthDtoSignin);

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthUserEntity.username,
      );
      expect(authUsersEntity).toEqual(userEntityHashed);
    });

    it('Should call usersService.findOne with an existing unique key, invalidate an incorrect password, and throw an error', async () => {
      const testHash = 'test_incorrect_hash';
      const passwordHashed = `${testSalt}.${testHash}`;

      const userEntityHashed = {
        ...testAuthDtoSignup,
        id: testAuthUserEntity.id,
        password: passwordHashed,
      };

      usersServiceFindOneMock.mockReturnValue(userEntityHashed);

      await expect(authService.signin(testAuthDtoSignin)).rejects.toThrow(
        BadRequestException,
      );
      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthUserEntity.username,
      );
    });
  });
});
