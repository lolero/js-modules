import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService, scrypt } from './auth.service';
import { AuthUsersEntity, AuthUsersService } from './auth.types';
import { AUTH_USERS_SERVICE } from './auth.constants';
import { AuthDtoSignup } from './auth.dto.signup';
import {
  getAuthDtoSigninFixture,
  getAuthDtoSignupFixture,
  getAuthUserEntityFixture,
} from './auth.utils.fixtures';
import { AuthDtoSignin } from './auth.dto.signin';

describe('AuthService', () => {
  let testAuthDtoSignup: AuthDtoSignup;

  let authUsersServiceCreateManyMock: jest.Mock;
  let authUsersServiceFindOneMock: jest.Mock;
  let authUsersServiceMock: Partial<AuthUsersService>;

  let authService: AuthService;

  beforeEach(async () => {
    authUsersServiceCreateManyMock = jest.fn();
    authUsersServiceFindOneMock = jest.fn();
    authUsersServiceMock = {
      createMany: authUsersServiceCreateManyMock,
      findOne: authUsersServiceFindOneMock,
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AUTH_USERS_SERVICE,
          useValue: authUsersServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should create an instance of AuthService', async () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    let authUsersServiceCreateManyMockReturnValue: AuthUsersEntity[];

    it('Should call usersService.createMany, with a salted and hashed password, and return the created user', async () => {
      authUsersServiceCreateManyMockReturnValue = [getAuthUserEntityFixture()];
      authUsersServiceCreateManyMock.mockReturnValue([
        authUsersServiceCreateManyMockReturnValue,
      ]);

      testAuthDtoSignup = getAuthDtoSignupFixture();
      const authUsersEntity = await authService.signup(testAuthDtoSignup);

      expect(authUsersServiceCreateManyMock).toHaveBeenNthCalledWith(1, [
        {
          ...testAuthDtoSignup,
          password: expect.anything(),
        },
      ]);

      const { password } = authUsersServiceCreateManyMock.mock.calls[0][0][0];
      expect(password).not.toBe(testAuthDtoSignup.password);

      const [salt, hash] = password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();

      expect(authUsersEntity).toEqual(
        authUsersServiceCreateManyMockReturnValue,
      );
    });
  });

  describe('signin', () => {
    let authUsersServiceFindOneMockReturnValue: AuthUsersEntity;
    const testSalt = 'test_salt';
    let testAuthDtoSignin: AuthDtoSignin;

    it('Should call usersService.findOne and throw an error if user is not found', async () => {
      authUsersServiceFindOneMockReturnValue = null;
      authUsersServiceFindOneMock.mockReturnValue(
        authUsersServiceFindOneMockReturnValue,
      );

      testAuthDtoSignin = getAuthDtoSigninFixture();
      await expect(authService.signin(testAuthDtoSignin)).rejects.toThrow(
        NotFoundException,
      );
      expect(authUsersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthDtoSignin.uniqueKeyValue,
      );
    });

    it('Should call usersService.findOne with an existing unique key, validate a correct password, and return the authenticated user', async () => {
      const testAuthUserEntity = getAuthUserEntityFixture();
      const testHash = (
        await scrypt(testAuthDtoSignin.password, testSalt, 32)
      ).toString('hex');
      const passwordHashed = `${testSalt}.${testHash}`;

      const userEntityHashed = {
        ...testAuthDtoSignup,
        id: testAuthUserEntity.id,
        password: passwordHashed,
      };

      authUsersServiceFindOneMockReturnValue = userEntityHashed;
      authUsersServiceFindOneMock.mockReturnValue(
        authUsersServiceFindOneMockReturnValue,
      );

      testAuthDtoSignin = getAuthDtoSigninFixture();
      const authUsersEntity = await authService.signin(testAuthDtoSignin);

      expect(authUsersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthDtoSignin.uniqueKeyValue,
      );
      expect(authUsersEntity).toEqual(authUsersServiceFindOneMockReturnValue);
    });

    it('Should call usersService.findOne with an existing unique key, invalidate an incorrect password, and throw an error', async () => {
      const testAuthUserEntity = getAuthUserEntityFixture();
      const testHash = 'test_incorrect_hash';
      const passwordHashed = `${testSalt}.${testHash}`;

      const userEntityHashed = {
        ...testAuthDtoSignup,
        id: testAuthUserEntity.id,
        password: passwordHashed,
      };

      authUsersServiceFindOneMockReturnValue = userEntityHashed;
      authUsersServiceFindOneMock.mockReturnValue(
        authUsersServiceFindOneMockReturnValue,
      );

      testAuthDtoSignin = getAuthDtoSigninFixture();
      await expect(authService.signin(testAuthDtoSignin)).rejects.toThrow(
        BadRequestException,
      );
      expect(authUsersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthDtoSignin.uniqueKeyValue,
      );
    });
  });
});
