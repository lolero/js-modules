import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import type { AuthDtoSignin } from './auth.dto.signin';
import type { AuthDtoSignup } from './auth.dto.signup';
import { AuthService } from './auth.service';
import type { AuthUsersEntity } from './auth.types';
import { getAuthUserEntityFixture } from './auth.utils.fixtures';

describe('AuthController', () => {
  let testSession: { userId?: AuthUsersEntity['id'] };
  let authServiceSignupMock: jest.Mock;
  let authServiceSigninMock: jest.Mock;
  let authServiceMock: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    authServiceSignupMock = jest.fn();
    authServiceSigninMock = jest.fn();
    authServiceMock = {
      signup: authServiceSignupMock,
      signin: authServiceSigninMock,
    } as unknown as AuthService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('Should create an instance of UsersController', () => {
    expect(authController).toBeDefined();
  });

  describe('signup', () => {
    let authServiceSignupMockReturnValue: AuthUsersEntity;
    let testAuthDtoSignup: AuthDtoSignup;

    it('Should call authService.signup, set the userId prop in the session, and return the signed up user', async () => {
      authServiceSignupMockReturnValue = getAuthUserEntityFixture();
      authServiceSignupMock.mockReturnValue(authServiceSignupMockReturnValue);

      testAuthDtoSignup = {
        email: authServiceSignupMockReturnValue.email,
        password: authServiceSignupMockReturnValue.password,
      };
      testSession = {};
      const authUsersEntity = await authController.signup(
        testAuthDtoSignup,
        testSession,
      );

      expect(authServiceSignupMock).toHaveBeenNthCalledWith(
        1,
        testAuthDtoSignup,
      );
      expect(testSession.userId).toBe(authServiceSignupMockReturnValue.id);
      expect(authUsersEntity).toEqual(authServiceSignupMockReturnValue);
    });
  });

  describe('signin', () => {
    let authServiceSigninMockReturnValue: AuthUsersEntity;
    let testAuthDtoSignin: AuthDtoSignin;

    it('Should call authService.signin, set the userId prop in the session, and return the authenticated user', async () => {
      authServiceSigninMockReturnValue = getAuthUserEntityFixture();
      authServiceSigninMock.mockReturnValue(authServiceSigninMockReturnValue);

      testAuthDtoSignin = {
        uniqueKeyName: 'id',
        uniqueKeyValue: authServiceSigninMockReturnValue.id,
        password: authServiceSigninMockReturnValue.password,
      };
      const authUsersEntity = await authController.signin(
        testAuthDtoSignin,
        testSession,
      );

      expect(authServiceSigninMock).toHaveBeenNthCalledWith(
        1,
        testAuthDtoSignin,
      );
      expect(testSession.userId).toBe(authServiceSigninMockReturnValue.id);
      expect(authUsersEntity).toEqual(authServiceSigninMockReturnValue);
    });
  });

  describe('signout', () => {
    it('Should delete the userId prop in the session', () => {
      testSession = {
        userId: getAuthUserEntityFixture().id,
      };

      authController.signout(testSession);

      expect(testSession.userId).toBeUndefined();
    });
  });
});
