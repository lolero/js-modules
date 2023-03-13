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

  describe('getFilterDateRange', () => {
    it('Should return a Date object initialized with 1970-01-01T00:00:00.000Z when null is passed as from value', () => {
      const [dateFrom] = usersServiceValidator.getFilterDateRange(
        null,
        '2000-01-01',
      );

      expect(dateFrom.toISOString()).toBe('1970-01-01T00:00:00.000Z');
    });

    it('Should return +275760-09-13T00:00:00.000Z when null is passed as to value', () => {
      const [, dateTo] = usersServiceValidator.getFilterDateRange(
        '2000-01-01',
        null,
      );

      expect(dateTo.toISOString()).toBe('+275760-09-13T00:00:00.000Z');
    });

    it('Should return a Date object initialized with +275760-09-13T00:00:00.000Z when null is passed as to value', () => {
      const [, dateTo] = usersServiceValidator.getFilterDateRange(
        '2000-01-01',
        null,
      );

      expect(dateTo.toISOString()).toBe('+275760-09-13T00:00:00.000Z');
    });

    it('Should handle unix milliseconds integer values', () => {
      const [dateFrom, dateTo] = usersServiceValidator.getFilterDateRange(
        946684800000,
        978307200000,
      );

      expect(dateFrom.toISOString()).toBe('2000-01-01T00:00:00.000Z');
      expect(dateTo.toISOString()).toBe('2001-01-01T00:00:00.000Z');
    });

    it('Should handle timestamp string values', () => {
      const [dateFrom, dateTo] = usersServiceValidator.getFilterDateRange(
        '2000-01-01',
        '2001-01-01',
      );

      expect(dateFrom.toISOString()).toBe('2000-01-01T00:00:00.000Z');
      expect(dateTo.toISOString()).toBe('2001-01-01T00:00:00.000Z');
    });
  });
});
