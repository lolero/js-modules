import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest as jestGlobals,
} from '@jest/globals';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AUTH_USERS_SERVICE } from '@js-modules/api-nest-utils';
import type { AuthDtoSignin } from './auth.dto.signin';
import type { AuthDtoSignup } from './auth.dto.signup';
import { AuthService } from './auth.service';
import type { AuthUsersEntity, AuthUsersService } from './auth.types';
import { authUtilScrypt } from './auth.util.scrypt';
import { authUtilValidatePassword } from './auth.util.validatePassword';
import {
  getAuthDtoSigninFixture,
  getAuthDtoSignupFixture,
  getAuthUserEntityFixture,
} from './auth.utils.fixtures';

jest.mock('./auth.util.scrypt');
jest.mock('./auth.util.validatePassword');

describe('AuthService', () => {
  const authUtilScryptMock = jestGlobals.mocked(authUtilScrypt);
  const authUtilValidatePasswordMock = jestGlobals.mocked(
    authUtilValidatePassword,
  );

  let testAuthDtoSignup: AuthDtoSignup;

  let authUsersServiceCreateManyMock: jestGlobals.Mock;
  let authUsersServiceFindOneMock: jestGlobals.Mock;
  let authUsersServiceMock: AuthUsersService;

  let authService: AuthService;

  beforeEach(async () => {
    authUsersServiceCreateManyMock = jestGlobals.fn();
    authUsersServiceFindOneMock = jestGlobals.fn();
    authUsersServiceMock = {
      createMany: authUsersServiceCreateManyMock,
      findOne: authUsersServiceFindOneMock,
    } as unknown as AuthUsersService;

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

  afterEach(() => {
    authUtilScryptMock.mockRestore();
    authUtilValidatePasswordMock.mockRestore();
  });

  it('Should create an instance of AuthService', () => {
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    let authUsersServiceCreateManyMockReturnValue: AuthUsersEntity[];

    it('Should call usersService.createMany, with a hashed password, and return the created user', async () => {
      const testAuthUserEntity = getAuthUserEntityFixture();
      authUtilScryptMock.mockImplementation(async () =>
        Promise.resolve('test_hash' as unknown as Buffer),
      );
      authUsersServiceCreateManyMockReturnValue = [testAuthUserEntity];
      authUsersServiceCreateManyMock.mockReturnValue(
        authUsersServiceCreateManyMockReturnValue,
      );

      testAuthDtoSignup = getAuthDtoSignupFixture();
      const authUsersEntity = await authService.signup(testAuthDtoSignup);

      expect(authUtilScryptMock).toHaveBeenNthCalledWith(
        1,
        testAuthDtoSignup.password,
        expect.anything(),
        32,
      );
      expect(authUsersServiceCreateManyMock).toHaveBeenNthCalledWith(1, [
        {
          ...testAuthDtoSignup,
          password: expect.anything(),
        },
      ]);
      expect(authUsersEntity).toEqual(
        authUsersServiceCreateManyMockReturnValue[0],
      );
    });
  });

  describe('signin', () => {
    let authUtilValidatePasswordMockReturnValue: boolean;
    let authUsersServiceFindOneMockReturnValue: AuthUsersEntity | null;
    let testAuthDtoSignin: AuthDtoSignin;

    it('Should call usersService.findOne and throw an error if user is not found', async () => {
      authUsersServiceFindOneMockReturnValue = null;
      authUsersServiceFindOneMock.mockReturnValue(
        authUsersServiceFindOneMockReturnValue,
      );

      testAuthDtoSignin = getAuthDtoSigninFixture();
      await expect(() => authService.signin(testAuthDtoSignin)).rejects.toThrow(
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
      const userEntityHashed: AuthUsersEntity = {
        ...getAuthDtoSignupFixture(),
        id: testAuthUserEntity.id,
        password: 'password_hashed',
        createdAt: testAuthUserEntity.createdAt,
        updatedAt: testAuthUserEntity.updatedAt,
        systemRoles: testAuthUserEntity.systemRoles,
      };
      authUsersServiceFindOneMockReturnValue = userEntityHashed;
      authUsersServiceFindOneMock.mockReturnValue(
        authUsersServiceFindOneMockReturnValue,
      );

      authUtilValidatePasswordMockReturnValue = true;
      authUtilValidatePasswordMock.mockReturnValue(
        Promise.resolve(authUtilValidatePasswordMockReturnValue),
      );

      testAuthDtoSignin = getAuthDtoSigninFixture();
      const authUsersEntity = await authService.signin(testAuthDtoSignin);

      expect(authUsersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthDtoSignin.uniqueKeyValue,
      );
      expect(authUtilValidatePasswordMock).toHaveBeenNthCalledWith(
        1,
        testAuthUserEntity.password,
        authUsersServiceFindOneMockReturnValue.password,
      );
      expect(authUsersEntity).toEqual(authUsersServiceFindOneMockReturnValue);
    });

    it('Should call usersService.findOne with an existing unique key, invalidate an incorrect password, and throw an error', async () => {
      const testAuthUserEntity = getAuthUserEntityFixture();
      const userEntityHashed: AuthUsersEntity = {
        ...getAuthDtoSignupFixture(),
        id: testAuthUserEntity.id,
        password: 'password_hashed',
        createdAt: testAuthUserEntity.createdAt,
        updatedAt: testAuthUserEntity.updatedAt,
        systemRoles: testAuthUserEntity.systemRoles,
      };
      authUsersServiceFindOneMockReturnValue = userEntityHashed;
      authUsersServiceFindOneMock.mockReturnValue(
        authUsersServiceFindOneMockReturnValue,
      );

      authUtilValidatePasswordMockReturnValue = false;
      authUtilValidatePasswordMock.mockReturnValue(
        Promise.resolve(authUtilValidatePasswordMockReturnValue),
      );

      testAuthDtoSignin = getAuthDtoSigninFixture();
      await expect(() => authService.signin(testAuthDtoSignin)).rejects.toThrow(
        BadRequestException,
      );
      expect(authUsersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testAuthDtoSignin.uniqueKeyValue,
      );
      expect(authUtilValidatePasswordMock).toHaveBeenNthCalledWith(
        1,
        testAuthUserEntity.password,
        authUsersServiceFindOneMockReturnValue.password,
      );
    });
  });
});
