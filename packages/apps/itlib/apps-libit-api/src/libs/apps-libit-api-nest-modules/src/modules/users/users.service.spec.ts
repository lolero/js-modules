import { Test, TestingModule } from '@nestjs/testing';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import upperCase from 'lodash/upperCase';
import keys from 'lodash/keys';
import { UsersService } from './users.service';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import { UsersEntity } from './users.entity';
import {
  getUsersDtoCreateOneFixture,
  getUsersDtoFindManyFixture,
  getUsersDtoUpdateOnePartialWithPatternFixture,
  getUsersEntityFixture,
  getUsersDtoUpdateOnePartialFixture,
  getUsersDtoUpdateOneWholeFixture,
  getUsersDtoDeleteManyFixture,
} from './users.utils.fixtures';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersDtoCreateOne } from './users.dto.createOne';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';
import { SystemRolesService } from '../systemRoles/systemRoles.service';
import { getSystemRolesEntityFixture } from '../systemRoles/systemRoles.utils.fixtures';
import { UsersEntityType } from './users.types';
import { requestsUtilCrossCheckIds } from '../../../../api-nest-utils/src';
import { SystemRolesEntity } from '../systemRoles/systemRoles.entity';

jest.mock('../../../../api-nest-utils/src', () => {
  const originalModule = jest.requireActual('../../../../api-nest-utils/src');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
    requestsUtilCrossCheckIds: jest.fn(),
  };
});

describe('UsersService', () => {
  const requestsUtilCrossCheckIdsMock = jest.mocked(requestsUtilCrossCheckIds);

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
      .mockImplementation((usersEntities) => usersEntities);
    usersRepositoryRemoveMock = jest.fn();
    usersRepositoryMock = {
      create: usersRepositoryCreateMock,
      createQueryBuilder: usersRepositoryCreateQueryBuilderMock,
      findOneBy: usersRepositoryFindOneByMock,
      findBy: usersRepositoryFindByMock,
      remove: usersRepositoryRemoveMock,
      save: usersRepositorySaveMock,
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
          provide: SystemRolesService,
          useValue: systemRolesServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    requestsUtilCrossCheckIdsMock.mockRestore();
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
      const usersEntities = await usersService.createMany(
        usersDtoCreateOneArray,
      );

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
      const usersEntities = await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryCreateQueryBuilderMock).toHaveBeenNthCalledWith(1);
      expect(usersRepositoryQueryBuilderSelectMock).toHaveBeenNthCalledWith(
        1,
        '*',
      );
      expect(usersEntities).toEqual(testUsersEntities);
    });

    it('Should filter the query by ids when the ids param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture();
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderWhereMock).toHaveBeenNthCalledWith(
        1,
        'id = :id',
        { id: In(usersDtoFindMany.ids) },
      );
    });

    it('Should not filter the query by ids if no ids param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({ ids: undefined });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderWhereMock).not.toHaveBeenCalled();
    });

    it('Should filter the query by username, email, and phoneNumber when the search param is passed', async () => {
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
        'phoneNumber = :phoneNumber',
        {
          phoneNumber: usersDtoFindMany.search,
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

  describe('updateManyWhole', () => {
    const testUserId1 = 1;
    const testUserId2 = 2;
    let usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[];

    it('Should call usersRepository.findBy with ids of the passed users, requestsUtilCrossCheckIds with the requested ids and found users, usersRepository.save with the updated users, and return the updated users', async () => {
      const testUsersEntity = getUsersEntityFixture();
      const usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: testUserId1,
          username: 'old_username',
        }),
        getUsersEntityFixture({
          id: testUserId2,
          username: 'old_username',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoUpdateOneWholeArray = [
        getUsersDtoUpdateOneWholeFixture({ id: testUserId1 }),
        getUsersDtoUpdateOneWholeFixture({ id: testUserId2 }),
      ];
      const usersEntities = await usersService.updateManyWhole(
        usersDtoUpdateOneWholeArray,
      );

      const requestedIds = usersDtoUpdateOneWholeArray.map(
        (usersEntity) => usersEntity.id,
      );
      expect(usersRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(requestedIds),
      });
      expect(requestsUtilCrossCheckIdsMock).toHaveBeenNthCalledWith(
        1,
        requestedIds,
        usersRepositoryFindByMockReturnValue,
      );
      expect(usersEntities).toEqual(
        usersDtoUpdateOneWholeArray.map((usersDtoUpdateOneWhole) => {
          const usersEntity: UsersEntityType = {
            ...usersDtoUpdateOneWhole,
            systemRoles: testUsersEntity.systemRoles,
          };
          return usersEntity;
        }),
      );
    });
  });

  describe('updateManyPartial', () => {
    const testUserId1 = 1;
    const testUserId2 = 2;
    let usersRepositoryFindByMockReturnValue: UsersEntity[];
    let usersDtoUpdateManyPartialObject: Record<
      UsersEntity['id'],
      UsersDtoUpdateOnePartial
    >;

    it('Should call usersRepository.findBy with ids of the passed partial users, requestsUtilCrossCheckIds with the requested ids and updated users, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: testUserId1,
          username: 'old_username',
        }),
        getUsersEntityFixture({
          id: testUserId2,
          username: 'old_username',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [testUserId1]: getUsersDtoUpdateOnePartialFixture(),
        [testUserId2]: getUsersDtoUpdateOnePartialFixture(),
      };
      const usersEntities = await usersService.updateManyPartial(
        usersDtoUpdateManyPartialObject,
      );

      const requestedIds = keys(usersDtoUpdateManyPartialObject).map((id) =>
        Number(id),
      );
      expect(usersRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(requestedIds),
      });
      expect(requestsUtilCrossCheckIdsMock).toHaveBeenNthCalledWith(
        1,
        requestedIds,
        usersRepositoryFindByMockReturnValue,
      );
      expect(usersEntities[0].username).toEqual(
        usersDtoUpdateManyPartialObject[testUserId1].username,
      );
      expect(usersEntities[1].username).toEqual(
        usersDtoUpdateManyPartialObject[testUserId2].username,
      );
    });
  });

  describe('updateManyPartialWithPattern', () => {
    const testUserId1 = 1;
    const testUserId2 = 2;
    let usersRepositoryFindByMockReturnValue: UsersEntity[];
    let usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern;

    it('Should call usersRepository.findBy with ids of the passed partial users, requestsUtilCrossCheckIds with the requested ids and updated users, usersRepository.save with the updated users, and return the updated users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({
          id: testUserId1,
          username: 'old_username',
        }),
        getUsersEntityFixture({
          id: testUserId2,
          username: 'old_username',
        }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoUpdateOnePartialWithPattern =
        getUsersDtoUpdateOnePartialWithPatternFixture();
      const usersEntities = await usersService.updateManyPartialWithPattern(
        usersDtoUpdateOnePartialWithPattern,
      );

      const requestedIds = usersDtoUpdateOnePartialWithPattern.ids;
      expect(usersRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(requestedIds),
      });
      expect(requestsUtilCrossCheckIdsMock).toHaveBeenNthCalledWith(
        1,
        requestedIds,
        usersRepositoryFindByMockReturnValue,
      );
      expect(usersEntities[0].username).toEqual(
        usersDtoUpdateOnePartialWithPattern.dtoUpdateOnePartial.username,
      );
      expect(usersEntities[1].username).toEqual(
        usersDtoUpdateOnePartialWithPattern.dtoUpdateOnePartial.username,
      );
    });
  });

  describe('deleteMany', () => {
    const testUserId1 = 1;
    const testUserId2 = 2;
    let usersRepositoryFindByMockReturnValue: UsersEntity[];
    let usersDtoDeleteMany: UsersDtoDeleteMany;

    it('Should call usersRepository.findBy with passed ids param, requestsUtilCrossCheckIds with the requested ids and removed users, and usersRepository.remove with the found users', async () => {
      usersRepositoryFindByMockReturnValue = [
        getUsersEntityFixture({ id: testUserId1 }),
        getUsersEntityFixture({ id: testUserId2 }),
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersDtoDeleteMany = getUsersDtoDeleteManyFixture();
      await usersService.deleteMany(usersDtoDeleteMany);

      const requestedIds = usersDtoDeleteMany.ids;
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
  });
});
