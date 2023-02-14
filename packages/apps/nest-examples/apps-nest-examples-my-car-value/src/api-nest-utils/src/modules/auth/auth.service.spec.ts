import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersEntityType, UsersServiceType } from './auth.types';
import { USERS_SERVICE } from './auth.constants';

describe('AuthService', () => {
  let service: AuthService;
  const testLoginCredentials: Pick<UsersEntityType, 'email' | 'password'> = {
    email: 'test@test.com',
    password: 'testpassword',
  };
  let fakeUsersService: UsersServiceType;

  beforeEach(async () => {
    const users: UsersEntityType[] = [];
    fakeUsersService = {
      createOne: (email: string, password: string) => {
        const user: UsersEntityType = {
          id: Math.floor(Math.random() * 999),
          email,
          password,
        };

        users.push(user);

        return Promise.resolve(user);
      },
      findOne: (id: number) => {
        const filteredUsers = users.filter((user) => user.id === id);
        return Promise.resolve(filteredUsers[0]);
      },
      findMany: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: USERS_SERVICE,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Should create an instance of AuthService', async () => {
    expect(service).toBeDefined();
  });

  describe('signup', () => {
    it('Should throw an error if user signs up with email that is in use', async () => {
      await service.signup(
        testLoginCredentials.email,
        testLoginCredentials.password,
      );

      await expect(
        service.signup(
          testLoginCredentials.email,
          testLoginCredentials.password,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('Should create a new user with a salted and hashed password', async () => {
      const user = await service.signup(
        testLoginCredentials.email,
        testLoginCredentials.password,
      );

      expect(user.password).not.toBe(testLoginCredentials.password);

      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    });
  });

  describe('signin', () => {
    it('Should throw an error if user signs in with an unused email', async () => {
      await expect(
        service.signin(
          testLoginCredentials.email,
          testLoginCredentials.password,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('Should return a user if the user signs in with valid password', async () => {
      await service.signup(
        testLoginCredentials.email,
        testLoginCredentials.password,
      );

      const user = await service.signin(
        testLoginCredentials.email,
        testLoginCredentials.password,
      );
      expect(user).toBeDefined();
    });
  });
});
