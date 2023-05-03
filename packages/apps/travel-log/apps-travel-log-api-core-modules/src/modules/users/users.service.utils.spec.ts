import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KeycloakTokenParsed } from 'keycloak-js';
import { UserRepresentation } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import { UsersEntity } from './users.entity';
import { UsersServiceUtils } from './users.service.utils';
import { getUsersEntityFixture } from './users.utils.fixtures';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';

describe('UsersServiceUtils', () => {
  let usersRepositoryFindOneByMockReturnValue: UsersEntity | null;
  let usersRepositoryFindOneByMock: jest.Mock;
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersServiceUtils: UsersServiceUtils;

  beforeEach(async () => {
    usersRepositoryFindOneByMock = jest.fn();
    usersRepositoryMock = {
      findOneBy: usersRepositoryFindOneByMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersServiceUtils,
        {
          provide: getRepositoryToken(UsersEntity),
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    usersServiceUtils = module.get<UsersServiceUtils>(UsersServiceUtils);
  });

  describe('validateUsername', () => {
    const testUsername = 'test_username';

    it('Should call usersRepository.findOneBy and return true if a user is not found', async () => {
      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidUsername = await usersServiceUtils.validateUsername(
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

      const isValidUsername = await usersServiceUtils.validateUsername(
        testUsername,
      );

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        username: testUsername,
      });
      expect(isValidUsername).toBe(false);
    });
  });

  describe('getKeycloakUserFromTokenParsed', () => {
    it('Should convert a KeycloakTokenParsed to a KeycloakUser', () => {
      const keycloakTokenParsed: KeycloakTokenParsed = {
        sub: 'test_sub',
        preferred_username: 'test_preferred_username',
        email: 'test_email',
        phone_number: 'test_phone_number',
        given_name: 'test_given_name',
        middle_name: 'test_middle_name',
        family_name: 'test_family_name',
      };

      const keycloakUser =
        usersServiceUtils.getKeycloakUserFromTokenParsed(keycloakTokenParsed);

      expect(keycloakUser).toEqual({
        keycloakId: keycloakTokenParsed.sub,
        username: keycloakTokenParsed.preferred_username,
        email: keycloakTokenParsed.email,
        phoneNumber: keycloakTokenParsed.phone_number,
        firstName: keycloakTokenParsed.given_name,
        middleName: keycloakTokenParsed.middle_name,
        lastName: keycloakTokenParsed.family_name,
      });
    });
  });

  describe('getUpdatedKeycloakUserRepresentation', () => {
    it('Should update a keycloak UserRepresentation with a UsersUpdateOnePartialDto', () => {
      const keycloakUserRepresentation: UserRepresentation = {
        id: 'test_id',
        username: 'test_username',
        email: 'test_email',
        firstName: 'test_firstName',
        lastName: 'test_lastName',
      };

      const usersUpdateOnePartialDto: UsersUpdateOnePartialDto = {
        username: 'test_username_updated',
        email: 'test_email_updated',
        firstName: 'test_firstName_updated',
        lastName: 'test_lastName_updated',
      };

      const updatedKeycloakUserRepresentation =
        usersServiceUtils.getUpdatedKeycloakUserRepresentation(
          keycloakUserRepresentation,
          usersUpdateOnePartialDto,
        );

      expect(updatedKeycloakUserRepresentation).toEqual({
        ...keycloakUserRepresentation,
        username: usersUpdateOnePartialDto.username,
        email: usersUpdateOnePartialDto.email,
        firstName: usersUpdateOnePartialDto.firstName,
        lastName: usersUpdateOnePartialDto.lastName,
      });
    });
  });

  describe('validateEmail', () => {
    const testEmail = 'test@email.com';

    it('Should call usersRepository.findOneBy and return true if a user is not found', async () => {
      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const isValidEmail = await usersServiceUtils.validateEmail(testEmail);

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

      const isValidEmail = await usersServiceUtils.validateEmail(testEmail);

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

      const isValidPhoneNumber = await usersServiceUtils.validatePhoneNumber(
        testPhoneNumber,
      );

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

      const isValidPhoneNumber = await usersServiceUtils.validatePhoneNumber(
        testPhoneNumber,
      );

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        phoneNumber: testPhoneNumber,
      });
      expect(isValidPhoneNumber).toBe(false);
    });
  });
});
