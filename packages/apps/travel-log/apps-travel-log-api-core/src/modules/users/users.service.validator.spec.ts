import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { UsersServiceValidator } from './users.service.validator';
import { getUsersEntityFixture } from './users.utils.fixtures';

describe('UsersServiceValidator', () => {
  let usersRepositoryFindOneByMockReturnValue: UsersEntity | null;
  let usersRepositoryFindOneByMock: jest.Mock;
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersServiceValidator: UsersServiceValidator;

  beforeEach(async () => {
    usersRepositoryFindOneByMock = jest.fn();
    usersRepositoryMock = {
      findOneBy: usersRepositoryFindOneByMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceValidator,
        {
          provide: getRepositoryToken(UsersEntity),
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    usersServiceValidator = module.get<UsersServiceValidator>(
      UsersServiceValidator,
    );
  });

  describe('validateUsername', () => {
    const testUsername = 'test_username';

    it('Should call usersRepository.findOneBy and return true if a user is not found', async () => {
      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidUsername = await usersServiceValidator.validateUsername(
        testUsername,
      );

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        username: testUsername,
      });
      expect(isValidUsername).toBe(true);
    });

    it('Should call usersRepository.findOneBy and return false if a user is found', async () => {
      usersRepositoryFindOneByMockReturnValue = getUsersEntityFixture();
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidUsername = await usersServiceValidator.validateUsername(
        testUsername,
      );

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        username: testUsername,
      });
      expect(isValidUsername).toBe(false);
    });
  });

  describe('validateEmail', () => {
    const testEmail = 'test@email.com';

    it('Should call usersRepository.findOneBy and return true if a user is not found', async () => {
      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidEmail = await usersServiceValidator.validateEmail(testEmail);

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        email: testEmail,
      });
      expect(isValidEmail).toBe(true);
    });

    it('Should call usersRepository.findOneBy and return false if a user is found', async () => {
      usersRepositoryFindOneByMockReturnValue = getUsersEntityFixture();
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidEmail = await usersServiceValidator.validateEmail(testEmail);

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        email: testEmail,
      });
      expect(isValidEmail).toBe(false);
    });
  });

  describe('validatePhoneNumber', () => {
    const testPhoneNumber = '+18001111111';

    it('Should call usersRepository.findOneBy and return true if a user is not found', async () => {
      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidPhoneNumber =
        await usersServiceValidator.validatePhoneNumber(testPhoneNumber);

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        phoneNumber: testPhoneNumber,
      });
      expect(isValidPhoneNumber).toBe(true);
    });

    it('Should call usersRepository.findOneBy and return false if a user is found', async () => {
      usersRepositoryFindOneByMockReturnValue = getUsersEntityFixture();
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidPhoneNumber =
        await usersServiceValidator.validatePhoneNumber(testPhoneNumber);

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        phoneNumber: testPhoneNumber,
      });
      expect(isValidPhoneNumber).toBe(false);
    });
  });
});
