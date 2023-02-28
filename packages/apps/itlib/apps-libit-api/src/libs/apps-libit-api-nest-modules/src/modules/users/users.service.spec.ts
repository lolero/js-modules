import { Test, TestingModule } from '@nestjs/testing';
import { Brackets, In, Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import upperCase from 'lodash/upperCase';
import keys from 'lodash/keys';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import noop from 'lodash/noop';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import {
  getUsersDtoCreateOneFixture,
  getUsersDtoFindManyFixture,
  getUsersEntityFixture,
  getUsersDtoUpdateOnePartialFixture,
} from './users.utils.fixtures';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { SystemRolesService } from '../systemRoles/systemRoles.service';
import { getSystemRolesEntityFixture } from '../systemRoles/systemRoles.utils.fixtures';
import {
  requestsUtilCrossCheckIds,
  UpdateManyEntitiesObjectDto,
  requestsUtilGetUniqueKeysWhereFactory,
} from '../../../../api-nest-utils/src';
import { SystemRolesEntity } from '../systemRoles/systemRoles.entity';
import { UsersServiceValidator } from './users.service.validator';
import { UsersEntityType } from './users.types';
import { SystemRolesName } from '../systemRoles/systemRoles.types';

jest.mock('../../../../api-nest-utils/src', () => {
  const originalModule = jest.requireActual('../../../../api-nest-utils/src');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
    requestsUtilCrossCheckIds: jest.fn(),
    requestsUtilGetUniqueKeysWhereFactory: jest.fn(),
  };
});

describe('UsersService', () => {
  const currentUser = getUsersEntityFixture({ id: 10000000 });
  const currentPassword = 'current_password';
  let usersEntities: UsersEntity[];

  const requestsUtilCrossCheckIdsMock = jest.mocked(requestsUtilCrossCheckIds);
  const requestsUtilGetUniqueKeysWhereFactoryMock = jest.mocked(
    requestsUtilGetUniqueKeysWhereFactory,
  );

  let usersRepositoryCreateQueryBuilderMock: jest.Mock;
  let usersRepositoryQueryBuilderSelectMock: jest.Mock;
  let usersRepositoryQueryBuilderWhereMock: jest.Mock;
  let usersRepositoryQueryBuilderAndWhereMock: jest.Mock;
  let usersRepositoryQueryBuilderOrderByMock: jest.Mock;
  let usersRepositoryQueryBuilderSetParametersMock: jest.Mock;
  let usersRepositoryQueryBuilderSkipMock: jest.Mock;
  let usersRepositoryQueryBuilderTakeMock: jest.Mock;
  let usersRepositoryQueryBuilderGetRawManyMock: jest.Mock;
  let usersRepositoryQueryBuilderMock: Partial<SelectQueryBuilder<UsersEntity>>;
  let usersRepositoryCreateMock: jest.Mock;
  let usersRepositoryFindOneByMock: jest.Mock;
  let usersRepositoryFindByMock: jest.Mock;
  let usersRepositorySaveMock: jest.Mock;
  let usersRepositoryRemoveMock: jest.Mock;
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersServiceValidatorValidateElevatedPermissionsMock: jest.Mock;
  let usersServiceValidatorValidateUsernameMock: jest.Mock;
  let usersServiceValidatorValidateEmailMock: jest.Mock;
  let usersServiceValidatorValidatePhoneNumberMock: jest.Mock;
  let usersServiceValidatorMock: Partial<UsersServiceValidator>;

  let systemRolesServiceFindOneMock: jest.Mock;
  let systemRolesServiceMock: Partial<SystemRolesService>;

  let usersService: UsersService;

  beforeEach(async () => {
    usersRepositoryQueryBuilderMock = {
      select: jest.fn(),
      where: jest.fn(),
      andWhere: jest.fn(),
      orderBy: jest.fn(),
      setParameters: jest.fn(),
      skip: jest.fn(),
      take: jest.fn(),
      getRawMany: jest.fn(),
    };
    usersRepositoryCreateQueryBuilderMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderSelectMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderWhereMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderAndWhereMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderOrderByMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderSetParametersMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderSkipMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderTakeMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderGetRawManyMock = jest.fn();
    Object.assign(usersRepositoryQueryBuilderMock, {
      select: usersRepositoryQueryBuilderSelectMock,
      where: usersRepositoryQueryBuilderWhereMock,
      andWhere: usersRepositoryQueryBuilderAndWhereMock,
      orderBy: usersRepositoryQueryBuilderOrderByMock,
      setParameters: usersRepositoryQueryBuilderSetParametersMock,
      skip: usersRepositoryQueryBuilderSkipMock,
      take: usersRepositoryQueryBuilderTakeMock,
      getRawMany: usersRepositoryQueryBuilderGetRawManyMock,
    });
    usersRepositoryCreateMock = jest.fn();
    usersRepositoryFindOneByMock = jest.fn();
    usersRepositoryFindByMock = jest.fn();
    usersRepositorySaveMock = jest
      .fn()
      .mockImplementation((usersEntitiesToSave) => usersEntitiesToSave);
    usersRepositoryRemoveMock = jest.fn();
    usersRepositoryMock = {
      create: usersRepositoryCreateMock,
      createQueryBuilder: usersRepositoryCreateQueryBuilderMock,
      findOneBy: usersRepositoryFindOneByMock,
      findBy: usersRepositoryFindByMock,
      remove: usersRepositoryRemoveMock,
      save: usersRepositorySaveMock,
    };

    usersServiceValidatorValidateElevatedPermissionsMock = jest.fn();
    usersServiceValidatorValidateUsernameMock = jest.fn();
    usersServiceValidatorValidateEmailMock = jest.fn();
    usersServiceValidatorValidatePhoneNumberMock = jest.fn();
    usersServiceValidatorMock = {
      validateElevatedPermissions:
        usersServiceValidatorValidateElevatedPermissionsMock,
      validateUsername: usersServiceValidatorValidateUsernameMock,
      validateEmail: usersServiceValidatorValidateEmailMock,
      validatePhoneNumber: usersServiceValidatorValidatePhoneNumberMock,
    };

    systemRolesServiceFindOneMock = jest.fn();
    systemRolesServiceMock = {
      findOne: systemRolesServiceFindOneMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useFactory: () => usersRepositoryMock,
        },
        {
          provide: UsersServiceValidator,
          useValue: usersServiceValidatorMock,
        },
        {
          provide: SystemRolesService,
          useValue: systemRolesServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    requestsUtilCrossCheckIdsMock.mockRestore();
    requestsUtilGetUniqueKeysWhereFactoryMock.mockRestore();
  });

  it('Should create an instance of UsersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('createMany', () => {
    let systemRolesServiceFindOneMockReturnValue: SystemRolesEntity;
    let usersRepositoryCreateMockReturnValue: UsersEntity[];
    let usersDtoCreateOneArray: UsersDtoCreateOne[];

    it('Should call usersRepository.create with a UsersDtoCreateOne, usersRepository.save with the created user, and return the created user', async () => {
      systemRolesServiceFindOneMockReturnValue = getSystemRolesEntityFixture();
      systemRolesServiceFindOneMock.mockReturnValue(
        systemRolesServiceFindOneMockReturnValue,
      );

      usersRepositoryCreateMockReturnValue = [
        getUsersEntityFixture({ systemRoles: [] }),
        getUsersEntityFixture({ systemRoles: [] }),
      ];
      usersRepositoryCreateMock.mockReturnValue(
        usersRepositoryCreateMockReturnValue,
      );

      usersDtoCreateOneArray = [
        getUsersDtoCreateOneFixture(),
        getUsersDtoCreateOneFixture(),
      ];
      usersEntities = await usersService.createMany(usersDtoCreateOneArray);

      expect(usersRepositoryCreateMock).toHaveBeenNthCalledWith(
        1,
        usersDtoCreateOneArray,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(1, usersEntities);
      expect(usersEntities).toEqual([
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ]);
    });
  });

  describe('findOne', () => {
    let usersRepositoryFindOneByMockReturnValue: UsersEntity;

    it('Should call usersRepository.findOneBy, with a unique key, and return the found user', async () => {
      const testUsersEntity = getUsersEntityFixture();
      usersRepositoryFindOneByMockReturnValue = testUsersEntity;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const usersEntity = await usersService.findOne(
        'username',
        getUsersEntityFixture().username,
      );

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        username: testUsersEntity.username,
      });
      expect(usersEntity).toEqual(testUsersEntity);
    });
  });

  describe('findMany', () => {
    let usersRepositoryQueryBuilderGetRawManyMockReturnValue: UsersEntity[];
    let usersDtoFindMany: UsersDtoFindMany;

    it('Should create a query builder, select all records, and return the found users', async () => {
      const testUsersEntities = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersRepositoryQueryBuilderGetRawManyMockReturnValue = testUsersEntities;
      usersRepositoryQueryBuilderGetRawManyMock.mockReturnValue(
        usersRepositoryQueryBuilderGetRawManyMockReturnValue,
      );

      usersDtoFindMany = getUsersDtoFindManyFixture();
      usersEntities = await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryCreateQueryBuilderMock).toHaveBeenNthCalledWith(1);
      expect(usersRepositoryQueryBuilderSelectMock).toHaveBeenNthCalledWith(
        1,
        '*',
      );
      expect(usersEntities).toEqual(testUsersEntities);
    });

    it('Should call requestsUtilGetUniqueKeysWhereFactory with the passed uniqueKeys, if it is defined and not empty, and filter the query with the resulting Brackets', async () => {
      const requestsUtilGetUniqueKeysWhereFactoryMockReturnValue = noop;
      requestsUtilGetUniqueKeysWhereFactoryMock.mockReturnValue(
        requestsUtilGetUniqueKeysWhereFactoryMockReturnValue,
      );

      usersDtoFindMany = getUsersDtoFindManyFixture({
        uniqueKeys: {
          id: [1, 2, 3],
        },
      });
      await usersService.findMany(usersDtoFindMany);

      expect(requestsUtilGetUniqueKeysWhereFactoryMock).toHaveBeenNthCalledWith(
        1,
        usersDtoFindMany.uniqueKeys,
      );
      expect(usersRepositoryQueryBuilderWhereMock).toHaveBeenNthCalledWith(
        1,
        new Brackets(requestsUtilGetUniqueKeysWhereFactoryMockReturnValue),
      );
    });

    it('Should not call requestsUtilGetUniqueKeysWhereFactory or filter the query by uniqueKeys if the passed uniqueKeys is not defined', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        uniqueKeys: undefined,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(requestsUtilGetUniqueKeysWhereFactoryMock).not.toHaveBeenCalled();
      expect(usersRepositoryQueryBuilderWhereMock).not.toHaveBeenCalled();
    });

    it('Should not call requestsUtilGetUniqueKeysWhereFactory or filter the query by uniqueKeys if the passed uniqueKeys is empty', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        uniqueKeys: {},
      });
      await usersService.findMany(usersDtoFindMany);

      expect(requestsUtilGetUniqueKeysWhereFactoryMock).not.toHaveBeenCalled();
      expect(usersRepositoryQueryBuilderWhereMock).not.toHaveBeenCalled();
    });

    it('Should filter the query by username, email, phoneNumber, firstName, middleName and lastName when the search param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        'username = :username',
        {
          username: usersDtoFindMany.search,
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        2,
        'email = :email',
        { email: usersDtoFindMany.search },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        3,
        'phone_number = :phoneNumber',
        {
          phoneNumber: usersDtoFindMany.search,
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        4,
        'first_name = :firstName',
        {
          firstName: usersDtoFindMany.search,
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        5,
        'middle_name = :middleName',
        {
          middleName: usersDtoFindMany.search,
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        6,
        'last_name = :lastName',
        {
          lastName: usersDtoFindMany.search,
        },
      );
    });

    it('Should not filter the query by username, email, or phoneNumber if no search param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({ search: undefined });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderAndWhereMock).not.toHaveBeenCalled();
    });

    it('Should sort the query by the sortBy param if one is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderOrderByMock).toHaveBeenNthCalledWith(
        1,
        ':sortBy',
        expect.anything(),
      );
      expect(
        usersRepositoryQueryBuilderSetParametersMock,
      ).toHaveBeenNthCalledWith(1, { sortBy: usersDtoFindMany.sortBy });
    });

    it('Should order the query by username if no sortBy param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({ sortBy: undefined });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderOrderByMock).toHaveBeenNthCalledWith(
        1,
        ':sortBy',
        expect.anything(),
      );
      expect(
        usersRepositoryQueryBuilderSetParametersMock,
      ).toHaveBeenNthCalledWith(1, { sortBy: 'username' });
    });

    it('Should order the query in the sortOrder param order if one is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderOrderByMock).toHaveBeenNthCalledWith(
        1,
        ':sortBy',
        upperCase(usersDtoFindMany.sortOrder),
      );
    });

    it('Should order the query in asc order if no sortOrder param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      usersDtoFindMany = getUsersDtoFindManyFixture({ sortOrder: undefined });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderOrderByMock).toHaveBeenNthCalledWith(
        1,
        ':sortBy',
        'ASC',
      );
    });

    it('Should skip and take records from the query according to the page and resultsPerPage params if they are passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderSkipMock).toHaveBeenNthCalledWith(
        1,
        usersDtoFindMany.resultsPerPage * (usersDtoFindMany.page - 1),
      );
      expect(usersRepositoryQueryBuilderTakeMock).toHaveBeenNthCalledWith(
        1,
        usersDtoFindMany.resultsPerPage,
      );
    });

    it('Should not skip any- and take infinity- records from the query if the resultsPerPage param is not passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      usersDtoFindMany = getUsersDtoFindManyFixture({
        resultsPerPage: undefined,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderSkipMock).toHaveBeenNthCalledWith(1, 0);
      expect(usersRepositoryQueryBuilderTakeMock).toHaveBeenNthCalledWith(
        1,
        Infinity,
      );
    });

    it('Should not skip any- but take records from the query, according to the if the resultsPerPage param, if the page param is not passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({ page: undefined });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderSkipMock).toHaveBeenNthCalledWith(1, 0);
      expect(usersRepositoryQueryBuilderTakeMock).toHaveBeenNthCalledWith(
        1,
        usersDtoFindMany.resultsPerPage,
      );
    });

    it('Should not skip any- but take records from the query, according to the if the resultsPerPage param, if the page param is 1', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({ page: 1 });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderSkipMock).toHaveBeenNthCalledWith(1, 0);
      expect(usersRepositoryQueryBuilderTakeMock).toHaveBeenNthCalledWith(
        1,
        usersDtoFindMany.resultsPerPage,
      );
    });
  });

  describe('updateManyPartial', () => {
    let usersEntitiesUpdated: UsersEntityType[];
    let usersRepositoryFindByMockReturnValue: UsersEntity[];
    let usersServiceValidatorValidateElevatedPermissionsMockReturnValue: Promise<boolean>;
    let usersServiceValidatorValidateUsernameMockReturnValue: Promise<boolean>;
    let usersServiceValidatorValidateEmailMockReturnValue: Promise<boolean>;
    let usersServiceValidatorValidatePhoneNumberMockReturnValue: Promise<boolean>;
    let usersDtoUpdateManyPartialObject: UpdateManyEntitiesObjectDto<
      UsersEntity,
      UsersDtoUpdateOnePartial
    >;

    it('Should call usersRepository.findBy with ids of the passed partial users, requestsUtilCrossCheckIds with the requested ids and found users, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          firstName: 'old_first_name',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ firstName: 'new_first_name' }),
      };
      usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
      );

      const requestedIds = keys(usersDtoUpdateManyPartialObject).map((id) =>
        Number(id),
      );
      usersEntitiesUpdated = [
        {
          ...usersRepositoryFindByMockReturnValue[0],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[0].id
          ],
        },
      ];
      expect(usersRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(requestedIds),
      });
      expect(requestsUtilCrossCheckIdsMock).toHaveBeenNthCalledWith(
        1,
        requestedIds,
        usersRepositoryFindByMockReturnValue,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersEntitiesUpdated,
      );
      expect(usersEntities).toEqual(usersEntitiesUpdated);
    });

    it('Should call validateElevatedPermissions for every user that gets an update, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: 1,
          firstName: 'old_first_name',
        }),
        getUsersEntityFixture({
          id: 2,
          firstName: 'old_first_name',
          middleName: 'old_middle_name',
          lastName: 'old_last_name',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ firstName: 'new_first_name' }),
        [usersRepositoryFindByMockReturnValue[1].id]:
          getUsersDtoUpdateOnePartialFixture({
            firstName: 'new_first_name',
            middleName: 'new_middle_name',
            lastName: 'new_last_name',
          }),
      };
      usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );

      usersEntitiesUpdated = [
        {
          ...usersRepositoryFindByMockReturnValue[0],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[0].id
          ],
        },
        {
          ...usersRepositoryFindByMockReturnValue[1],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[1].id
          ],
        },
      ];
      expect(
        usersServiceValidatorValidateElevatedPermissionsMock,
      ).toHaveBeenNthCalledWith(
        1,
        usersRepositoryFindByMockReturnValue[0],
        currentUser,
        currentPassword,
      );
      expect(
        usersServiceValidatorValidateElevatedPermissionsMock,
      ).toHaveBeenNthCalledWith(
        2,
        usersRepositoryFindByMockReturnValue[1],
        currentUser,
        currentPassword,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersEntitiesUpdated,
      );
      expect(usersEntities).toEqual(usersEntitiesUpdated);
    });

    it('Should not throw an error if validateElevatedPermissions returns false but the users username, email, phoneNumber, password, and systemRoles are not being updated', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          firstName: 'old_first_name',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ firstName: 'new_first_name' }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).resolves.not.toThrow();
    });

    it('Should throw an error if a username is updated but validateElevatedPermissions returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          username: 'old_username',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ username: 'new_username' }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Should throw an error if an email is updated but validateElevatedPermissions returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          email: 'test-old@email.com',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ email: 'test-new@email.com' }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Should throw an error if a phoneNumber is updated but validateElevatedPermissions returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          phoneNumber: '+18001111110',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ phoneNumber: '+18001111111' }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Should throw an error if systemRoles are updated but validateElevatedPermissions returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          systemRoles: [getSystemRolesEntityFixture()],
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({
            systemRolesNames: [SystemRolesName.ADMIN],
          }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Should call validateUsername, update the users usernames, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: 1,
          username: 'old_username_1',
        }),
        getUsersEntityFixture({
          id: 2,
          username: 'old_username_2',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );
      usersServiceValidatorValidateUsernameMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateUsernameMock.mockReturnValue(
        usersServiceValidatorValidateUsernameMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ username: 'new_username_1' }),
        [usersRepositoryFindByMockReturnValue[1].id]:
          getUsersDtoUpdateOnePartialFixture({ username: 'new_username_2' }),
      };
      usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );

      usersEntitiesUpdated = [
        {
          ...usersRepositoryFindByMockReturnValue[0],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[0].id
          ],
        },
        {
          ...usersRepositoryFindByMockReturnValue[1],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[1].id
          ],
        },
      ];
      expect(usersServiceValidatorValidateUsernameMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject[
          usersRepositoryFindByMockReturnValue[0].id
        ].username,
      );
      expect(usersServiceValidatorValidateUsernameMock).toHaveBeenNthCalledWith(
        2,
        usersDtoUpdateManyPartialObject[
          usersRepositoryFindByMockReturnValue[1].id
        ].username,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersEntitiesUpdated,
      );
      expect(usersEntities).toEqual(usersEntitiesUpdated);
    });

    it('Should throw an error if a username is updated but validateUsername returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          username: 'old_username_1',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );
      usersServiceValidatorValidateUsernameMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateUsernameMock.mockReturnValue(
        usersServiceValidatorValidateUsernameMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ username: 'new_username_1' }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('Should call validateEmail, update the users emails, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: 1,
          email: 'test-old-1@email.com',
        }),
        getUsersEntityFixture({
          id: 2,
          email: 'test-old-2@email.com',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );
      usersServiceValidatorValidateEmailMockReturnValue = Promise.resolve(true);
      usersServiceValidatorValidateEmailMock.mockReturnValue(
        usersServiceValidatorValidateEmailMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ email: 'test-new-1@email.com' }),
        [usersRepositoryFindByMockReturnValue[1].id]:
          getUsersDtoUpdateOnePartialFixture({ email: 'test-new-2@email.com' }),
      };
      usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );

      usersEntitiesUpdated = [
        {
          ...usersRepositoryFindByMockReturnValue[0],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[0].id
          ],
        },
        {
          ...usersRepositoryFindByMockReturnValue[1],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[1].id
          ],
        },
      ];
      expect(usersServiceValidatorValidateEmailMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject[
          usersRepositoryFindByMockReturnValue[0].id
        ].email,
      );
      expect(usersServiceValidatorValidateEmailMock).toHaveBeenNthCalledWith(
        2,
        usersDtoUpdateManyPartialObject[
          usersRepositoryFindByMockReturnValue[1].id
        ].email,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersEntitiesUpdated,
      );
      expect(usersEntities).toEqual(usersEntitiesUpdated);
    });

    it('Should throw an error if a email is updated but validateEmail returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          email: 'test-old-1@email.com',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );
      usersServiceValidatorValidateEmailMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateEmailMock.mockReturnValue(
        usersServiceValidatorValidateEmailMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ email: 'test-new-1@email.com' }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('Should call validatePhoneNumber, update the users phoneNumbers, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: 1,
          phoneNumber: '+18001111110',
        }),
        getUsersEntityFixture({
          id: 2,
          phoneNumber: '+18002222220',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );
      usersServiceValidatorValidatePhoneNumberMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidatePhoneNumberMock.mockReturnValue(
        usersServiceValidatorValidatePhoneNumberMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({ phoneNumber: '+18001111111' }),
        [usersRepositoryFindByMockReturnValue[1].id]:
          getUsersDtoUpdateOnePartialFixture({ phoneNumber: '+18002222221' }),
      };
      usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );

      usersEntitiesUpdated = [
        {
          ...usersRepositoryFindByMockReturnValue[0],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[0].id
          ],
        },
        {
          ...usersRepositoryFindByMockReturnValue[1],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[1].id
          ],
        },
      ];
      expect(
        usersServiceValidatorValidatePhoneNumberMock,
      ).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject[
          usersRepositoryFindByMockReturnValue[0].id
        ].phoneNumber,
      );
      expect(
        usersServiceValidatorValidatePhoneNumberMock,
      ).toHaveBeenNthCalledWith(
        2,
        usersDtoUpdateManyPartialObject[
          usersRepositoryFindByMockReturnValue[1].id
        ].phoneNumber,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersEntitiesUpdated,
      );
      expect(usersEntities).toEqual(usersEntitiesUpdated);
    });

    it('Should throw an error if a phoneNumber is updated but validatePhoneNumber returns false', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          phoneNumber: '+18001111110',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );
      usersServiceValidatorValidatePhoneNumberMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidatePhoneNumberMock.mockReturnValue(
        usersServiceValidatorValidatePhoneNumberMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({
            phoneNumber: '+18001111111',
          }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('Should update the users firstName, middleName, lastname, call usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: 1,
          firstName: 'old_first_name',
          middleName: 'old_middle_name',
          lastName: 'old_last_name',
        }),
        getUsersEntityFixture({
          id: 2,
          firstName: 'old_first_name',
          middleName: 'old_middle_name',
          lastName: 'old_last_name',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({
            firstName: 'new_first_name',
            middleName: 'new_middle_name',
            lastName: 'new_last_name',
          }),
        [usersRepositoryFindByMockReturnValue[1].id]:
          getUsersDtoUpdateOnePartialFixture({
            firstName: 'new_first_name',
            middleName: 'new_middle_name',
            lastName: 'new_last_name',
          }),
      };
      usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );

      usersEntitiesUpdated = [
        {
          ...usersRepositoryFindByMockReturnValue[0],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[0].id
          ],
        },
        {
          ...usersRepositoryFindByMockReturnValue[1],
          ...usersDtoUpdateManyPartialObject[
            usersRepositoryFindByMockReturnValue[1].id
          ],
        },
      ];
      expect(
        usersServiceValidatorValidateElevatedPermissionsMock,
      ).toHaveBeenNthCalledWith(
        1,
        usersRepositoryFindByMockReturnValue[0],
        currentUser,
        currentPassword,
      );
      expect(
        usersServiceValidatorValidateElevatedPermissionsMock,
      ).toHaveBeenNthCalledWith(
        2,
        usersRepositoryFindByMockReturnValue[1],
        currentUser,
        currentPassword,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersEntitiesUpdated,
      );
      expect(usersEntities).toEqual(usersEntitiesUpdated);
    });

    it('Should throw an error if a user updates their own systemRoles', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: currentUser.id,
          systemRoles: [getSystemRolesEntityFixture()],
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [usersRepositoryFindByMockReturnValue[0].id]:
          getUsersDtoUpdateOnePartialFixture({
            systemRolesNames: [SystemRolesName.ADMIN],
          }),
      };
      await expect(
        usersService.updateManyPartial(
          usersDtoUpdateManyPartialObject,
          currentUser,
          currentPassword,
        ),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('deleteMany', () => {
    let usersRepositoryFindByMockReturnValue: UsersEntity[];
    let usersServiceValidatorValidateElevatedPermissionsMockReturnValue: Promise<boolean>;

    it('Should call usersRepository.findBy with the passed ids, requestsUtilCrossCheckIds with the requested ids and found users, and usersRepository.remove with the found users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({ id: 1 }),
        getUsersEntityFixture({ id: 1 }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      const requestedIds = usersRepositoryFindByMockReturnValue.map(
        (usersEntity) => usersEntity.id,
      );
      await usersService.deleteMany(requestedIds, currentUser, currentPassword);

      expect(usersRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(requestedIds),
      });
      expect(requestsUtilCrossCheckIdsMock).toHaveBeenNthCalledWith(
        1,
        requestedIds,
        usersRepositoryFindByMockReturnValue,
      );
      expect(usersRepositoryRemoveMock).toHaveBeenNthCalledWith(
        1,
        usersRepositoryFindByMockReturnValue,
      );
    });

    it('Should throw an error if validateElevatedPermissions returns false', async () => {
      usersRepositoryFindByMockReturnValue = [getUsersEntityFixture()];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(false);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      const requestedIds = usersRepositoryFindByMockReturnValue.map(
        (usersEntity) => usersEntity.id,
      );
      await expect(
        usersService.deleteMany(requestedIds, currentUser, currentPassword),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('Should throw an error if user tries to delete their own account in a bulk operation', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({ id: 1 }),
        getUsersEntityFixture({ id: currentUser.id }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );
      usersServiceValidatorValidateElevatedPermissionsMockReturnValue =
        Promise.resolve(true);
      usersServiceValidatorValidateElevatedPermissionsMock.mockReturnValue(
        usersServiceValidatorValidateElevatedPermissionsMockReturnValue,
      );

      const requestedIds = usersRepositoryFindByMockReturnValue.map(
        (usersEntity) => usersEntity.id,
      );
      await expect(
        usersService.deleteMany(requestedIds, currentUser, currentPassword),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
