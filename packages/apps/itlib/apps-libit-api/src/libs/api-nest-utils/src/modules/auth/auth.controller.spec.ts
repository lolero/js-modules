import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthUsersEntity } from './auth.types';
import { AuthDtoSignin } from './auth.dto.signin';
import { getAuthUserEntityFixture } from './auth.utils.fixtures';

describe('AuthController', () => {
  let testAuthUserEntity: AuthUsersEntity;
  let testSession: { userId?: AuthUsersEntity['id'] };
  let authServiceSignupMock: jest.Mock;
  let authServiceSigninMock: jest.Mock;
  let authServiceMock: Partial<AuthService>;
  let authController: AuthController;

  beforeEach(async () => {
    testAuthUserEntity = getAuthUserEntityFixture();
    testSession = {};
    authServiceSignupMock = jest.fn();
    authServiceSigninMock = jest.fn();
    authServiceMock = {
      signup: authServiceSignupMock,
      signin: authServiceSigninMock,
    };

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
    let testAuthDtoSignup: AuthDtoSignup;

    beforeEach(() => {
      testAuthDtoSignup = {
        email: testAuthUserEntity.email,
        password: testAuthUserEntity.password,
      };
    });

    it('Should call authService.signup, set the userId prop in the session, and return the signed up user', async () => {
      authServiceSignupMock.mockReturnValue(testAuthUserEntity);

      const authUsersEntity = await authController.signup(
        testAuthDtoSignup,
        testSession,
      );

      expect(authServiceSignupMock).toHaveBeenNthCalledWith(
        1,
        testAuthDtoSignup,
      );
      expect(testSession.userId).toBe(testAuthUserEntity.id);
      expect(authUsersEntity).toEqual(testAuthUserEntity);
    });
  });

  describe('signin', () => {
    let testAuthDtoSignin: AuthDtoSignin;

    beforeEach(() => {
      testAuthDtoSignin = {
        uniqueKeyName: 'id',
        uniqueKeyValue: testAuthUserEntity.id,
        password: testAuthUserEntity.password,
      };
    });

    it('Should call authService.signin, set the userId prop in the session, and return the authenticated user', async () => {
      authServiceSigninMock.mockReturnValue(testAuthUserEntity);

      const authUsersEntity = await authController.signin(
        testAuthDtoSignin,
        testSession,
      );

      expect(authServiceSigninMock).toHaveBeenNthCalledWith(
        1,
        testAuthDtoSignin,
      );
      expect(testSession.userId).toBe(testAuthUserEntity.id);
      expect(authUsersEntity).toEqual(testAuthUserEntity);
    });
  });

  describe('signout', () => {
    it('Should delete the userId prop in the session', async () => {
      testSession = {
        userId: testAuthUserEntity.id,
      };

      await authController.signout(testSession);

      expect(testSession.userId).toBeUndefined();
    });
  });
});
