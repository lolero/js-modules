import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService, scrypt } from './auth.service';
import { AuthUsersEntity, AuthUsersService } from './auth.types';
import { USERS_SERVICE } from './auth.constants';
import { AuthDtoSignup } from './auth.dto.signup';

describe('AuthService', () => {
  let service: AuthService;
  const testUserId: AuthUsersEntity['id'] = 'test_id';
  const testAuthDtoSignup: AuthDtoSignup = {
    username: 'test_username',
    email: 'test@test.com',
    phoneNumber: '+18001234567',
    password: 'test_password',
  };
  let usersServiceCreateOneMock: jest.Mock;
  let usersServiceFindOneMock: jest.Mock;
  let usersServiceMock: Partial<AuthUsersService>;

  beforeEach(async () => {
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

    service = module.get<AuthService>(AuthService);
  });

  it('Should create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('Should create a new user with a salted and hashed password', async () => {
      await service.signup(testAuthDtoSignup);

      expect(usersServiceCreateOneMock).toHaveBeenNthCalledWith(1, {
        ...testAuthDtoSignup,
        password: expect.anything(),
      });

      const { password } = usersServiceCreateOneMock.mock.calls[0][0];
      expect(password).not.toBe(testAuthDtoSignup.password);

      const [salt, hash] = password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });
  });

  describe('signin', () => {
    it('Should throw an error if user signs in with unused unique key', async () => {
      usersServiceFindOneMock.mockReturnValue(null);

      await expect(
        service.signin('id', testUserId, testAuthDtoSignup.password),
      ).rejects.toThrow(NotFoundException);
    });

    it('Should return a user if the user signs in with existing unique key and valid password', async () => {
      const testSalt = 'test_salt';
      const testHash = (
        await scrypt(testAuthDtoSignup.password, testSalt, 32)
      ).toString('hex');
      const passwordHashed = `${testSalt}.${testHash}`;

      usersServiceFindOneMock.mockReturnValue({
        ...testAuthDtoSignup,
        id: testUserId,
        password: passwordHashed,
      });

      const user = await service.signin(
        'username',
        testAuthDtoSignup.username,
        testAuthDtoSignup.password,
      );

      expect(user).toBeDefined();
    });

    it('Should throw and error if the user signs in with existing unique key and invalid password', async () => {
      const testSalt = 'test_salt';
      const testHash = 'test_incorrect_hash';
      const passwordHashed = `${testSalt}.${testHash}`;

      usersServiceFindOneMock.mockReturnValue({
        ...testAuthDtoSignup,
        id: testUserId,
        password: passwordHashed,
      });

      await expect(
        service.signin(
          'username',
          testAuthDtoSignup.username,
          'invalid_password',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
