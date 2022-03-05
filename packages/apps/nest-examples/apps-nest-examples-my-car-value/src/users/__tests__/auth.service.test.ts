import { Test } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../users.service';

describe('AuthService', () => {
  it('Should create an instance of the auth service', async () => {
    const fakeUsersService = {
      findOne: () => Promise.resolve([]),
      createOne: (email: string, password: string) =>
        Promise.resolve({
          id: 1,
          email,
          password,
        }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    const service = module.get(AuthService);

    expect(service).toBeDefined();
  });
});
