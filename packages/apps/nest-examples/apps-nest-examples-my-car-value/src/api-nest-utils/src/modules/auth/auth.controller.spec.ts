import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthDtoSignup } from './auth.dto.signup';
import { AuthUsersEntity } from './auth.types';
import { AuthDtoSignin } from './auth.dto.signin';

describe('AuthController', () => {
  let controller: AuthController;
  let authServiceSignupMock: jest.Mock;
  let authServiceSigninMock: jest.Mock;
  let authServiceMock: Partial<AuthService>;

  beforeEach(async () => {
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

    controller = module.get<AuthController>(AuthController);
  });

  it('Should create an instance of UsersController', () => {
    expect(controller).toBeDefined();
  });

  describe('signup', () => {
    it('Should signup and set the userId prop in the session', async () => {
      const testId = 'test_id';
      const testPassword = 'test_password';
      const testBody: AuthDtoSignup = {
        email: 'test@email.com',
        password: testPassword,
      };
      const testSession: { userId?: string } = {};

      authServiceSignupMock.mockReturnValue({
        ...testBody,
        id: testId,
      });

      await controller.signup(testBody, testSession);

      expect(authServiceSignupMock).toHaveBeenNthCalledWith(1, testBody);
      expect(testSession.userId).toBe(testId);
    });
  });

  describe('signin', () => {
    it('Should signin and set the userId prop in the session', async () => {
      const testId = 'test_id';
      const testPassword = 'test_password';
      const testBody: AuthDtoSignin = {
        uniqueKeyName: 'id',
        uniqueKeyValue: testId,
        password: testPassword,
      };
      const testUser: AuthUsersEntity = {
        id: testBody.uniqueKeyValue,
        email: 'test@email.com',
        password: testPassword,
      };
      const testSession: { userId?: string } = {};

      authServiceSigninMock.mockReturnValue(testUser);

      await controller.signin(testBody, testSession);

      expect(authServiceSigninMock).toHaveBeenNthCalledWith(
        1,
        testBody.uniqueKeyName,
        testBody.uniqueKeyValue,
        testBody.password,
      );
      expect(testSession.userId).toBe(testId);
    });
  });

  describe('signout', () => {
    it('Should delete the userId prop in the session', async () => {
      const testId = 'test_id';
      const testSession: { userId?: string } = { userId: testId };

      await controller.signout(testSession);

      expect(testSession.userId).toBeUndefined();
    });
  });
});
