import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUsersEntity, AuthUsersService } from './auth.types';
import { AUTH_USERS_SERVICE } from './auth.constants';
import { AuthDtoSignup } from './auth.dto.signup';
import {
  getAuthDtoSigninFixture,
  getAuthDtoSignupFixture,
  getAuthUserEntityFixture,
} from './auth.utils.fixtures';
import { AuthDtoSignin } from './auth.dto.signin';
import { authUtilValidatePassword } from './auth.util.validatePassword';
import { authUtilScrypt } from './auth.util.scrypt';

jest.mock('./auth.util.scrypt');
jest.mock('./auth.util.validatePassword');

describe('AuthService', () => {
  const authUtilScryptMock = jest.mocked(authUtilScrypt);
  const authUtilValidatePasswordMock = jest.mocked(authUtilValidatePassword);

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

  afterEach(() => {
    authUtilScryptMock.mockRestore();
    authUtilValidatePasswordMock.mockRestore();
  });

  it('Should create an instance of AuthService', async () => {
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
    let authUsersServiceFindOneMockReturnValue: AuthUsersEntity;
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
      const userEntityHashed = {
        ...getAuthDtoSignupFixture(),
        id: testAuthUserEntity.id,
        password: 'password_hashed',
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
      const userEntityHashed = {
        ...getAuthDtoSignupFixture(),
        id: testAuthUserEntity.id,
        password: 'password_hashed',
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
