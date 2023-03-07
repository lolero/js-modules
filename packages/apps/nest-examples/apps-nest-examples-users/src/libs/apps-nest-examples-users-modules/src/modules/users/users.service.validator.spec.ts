import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import values from 'lodash/values';
import keyBy from 'lodash/keyBy';
import sortBy from 'lodash/sortBy';
import sortedUniq from 'lodash/sortedUniq';
import { UnauthorizedException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { UsersServiceValidator } from './users.service.validator';
import { getUsersEntityFixture } from './users.utils.fixtures';
import { getSystemRolesEntityFixture } from '../systemRoles/systemRoles.utils.fixtures';
import { SystemRolesName } from '../systemRoles/systemRoles.types';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';

describe('UsersServiceValidator', () => {
  let usersRepositoryFindOneByMockReturnValue: UsersEntity;
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

  describe('validateCurrentUserSystemRoles', () => {
    it('Should return true if current user has the passed systemRolesNames', () => {
      const currentUser = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
          getSystemRolesEntityFixture({ name: SystemRolesName.ADMIN }),
        ],
      });

      const isValidCurrentUserSystemRoles =
        usersServiceValidator.validateCurrentUserSystemRoles(
          [SystemRolesName.ADMIN, SystemRolesName.USER],
          currentUser,
        );

      expect(isValidCurrentUserSystemRoles).toBe(true);
    });

    it('Should return false if current user doesnt have the passed systemRolesNames', () => {
      const currentUser = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
          getSystemRolesEntityFixture({ name: SystemRolesName.ADMIN }),
        ],
      });

      const isValidCurrentUserSystemRoles =
        usersServiceValidator.validateCurrentUserSystemRoles(
          [SystemRolesName.ADMIN, SystemRolesName.SUPER_ADMIN],
          currentUser,
        );

      expect(isValidCurrentUserSystemRoles).toBe(false);
    });
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

  describe('getSystemRolesUpdated', () => {
    const testSystemRolesEntities = values(SystemRolesName).map(
      (systemRolesName) =>
        getSystemRolesEntityFixture({
          name: systemRolesName,
        }),
    );
    const systemRolesByRoleName = keyBy(testSystemRolesEntities, 'name');
    let usersDtoUpdateOne: UsersDtoUpdateOnePartial | UsersDtoUpdateOneWhole;
    let isCurrentUserSystemRole: Record<SystemRolesName, boolean>;
    let isCurrentUserPasswordValid: boolean;
    let usersEntity: UsersEntity;

    it('Should throw error if isCurrentUserPasswordValid is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = false;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
    });

    it('Should remove SystemRolesName.SUPER_ADMIN', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.ADMIN, SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: false,
        [SystemRolesName.USER]: false,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.SUPER_ADMIN }),
          getSystemRolesEntityFixture({ name: SystemRolesName.ADMIN }),
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
        ],
      });

      const systemRolesNamesUpdated =
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        );

      expect(systemRolesNamesUpdated).toEqual(
        sortedUniq(sortBy(usersDtoUpdateOne.systemRolesNames)),
      );
    });

    it('Should throw error when removing SystemRolesName.SUPER_ADMIN if isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN] is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.ADMIN, SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: false,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.SUPER_ADMIN }),
          getSystemRolesEntityFixture({ name: SystemRolesName.ADMIN }),
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
        ],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
    });

    it('Should remove SystemRolesName.ADMIN', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: false,
        [SystemRolesName.USER]: false,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.ADMIN }),
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
        ],
      });

      const systemRolesNamesUpdated =
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        );

      expect(systemRolesNamesUpdated).toEqual(
        sortedUniq(sortBy(usersDtoUpdateOne.systemRolesNames)),
      );
    });

    it('Should throw error when removing SystemRolesName.ADMIN if isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN] is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: false,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.ADMIN }),
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
        ],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
    });

    it('Should remove SystemRolesName.USER', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: false,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: false,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
        ],
      });

      const systemRolesNamesUpdated =
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        );

      expect(systemRolesNamesUpdated).toEqual(
        sortedUniq(sortBy(usersDtoUpdateOne.systemRolesNames)),
      );
    });

    it('Should throw error when removing SystemRolesName.USER if isCurrentUserSystemRole[SystemRolesName.ADMIN] is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: false,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [
          getSystemRolesEntityFixture({ name: SystemRolesName.USER }),
        ],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
    });

    it('Should add SystemRolesName.USER', async () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: false,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: false,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      const systemRolesNamesUpdated =
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        );

      expect(systemRolesNamesUpdated).toEqual(
        sortedUniq(sortBy([SystemRolesName.USER])),
      );
    });

    it('Should throw error when adding SystemRolesName.USER if isCurrentUserSystemRole[SystemRolesName.ADMIN] is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.USER],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: false,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
    });

    it('Should add SystemRolesName.ADMIN and its sub systemRoles', async () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.ADMIN],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: false,
        [SystemRolesName.USER]: false,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      const systemRolesNamesUpdated =
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        );

      expect(systemRolesNamesUpdated).toEqual(
        sortedUniq(sortBy([SystemRolesName.ADMIN, SystemRolesName.USER])),
      );
    });

    it('Should throw error when adding SystemRolesName.ADMIN if isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN] is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.ADMIN],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: false,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
    });

    it('Should add SystemRolesName.SUPER_ADMIN and its sub systemRoles', async () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.SUPER_ADMIN],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: true,
        [SystemRolesName.ADMIN]: false,
        [SystemRolesName.USER]: false,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      const systemRolesNamesUpdated =
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        );

      expect(systemRolesNamesUpdated).toEqual(
        sortedUniq(
          sortBy([
            SystemRolesName.SUPER_ADMIN,
            SystemRolesName.ADMIN,
            SystemRolesName.USER,
          ]),
        ),
      );
    });

    it('Should throw error when adding SystemRolesName.SUPER_ADMIN if isCurrentUserSystemRole[SystemRolesName.SUPER_ADMIN] is false', () => {
      usersDtoUpdateOne = {
        systemRolesNames: [SystemRolesName.SUPER_ADMIN],
      };
      isCurrentUserSystemRole = {
        [SystemRolesName.SUPER_ADMIN]: false,
        [SystemRolesName.ADMIN]: true,
        [SystemRolesName.USER]: true,
      };
      isCurrentUserPasswordValid = true;
      usersEntity = getUsersEntityFixture({
        systemRoles: [],
      });

      expect(() =>
        usersServiceValidator.getSystemRolesNamesUpdated(
          systemRolesByRoleName,
          usersDtoUpdateOne,
          isCurrentUserSystemRole,
          isCurrentUserPasswordValid,
          usersEntity,
        ),
      ).toThrow(UnauthorizedException);
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
