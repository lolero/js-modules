import { Test, TestingModule } from '@nestjs/testing';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import upperCase from 'lodash/upperCase';
import { BadRequestException } from '@nestjs/common';
import noop from 'lodash/noop';
import {
  requestsUtilGetUniqueKeysWhereFactory,
  utilsGetFilterDateRange,
} from '@js-modules/api-nest-utils';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import {
  getUsersDtoFindManyFixture,
  getUsersEntityFixture,
} from './users.utils.fixtures';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersServiceValidator } from './users.service.validator';

jest.mock('@js-modules/api-nest-utils', () => {
  const originalModule = jest.requireActual('@js-modules/api-nest-utils');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
    requestsUtilGetUniqueKeysWhereFactory: jest.fn(),
    utilsGetFilterDateRange: jest.fn(),
  };
});

describe('UsersService', () => {
  let usersEntities: UsersEntity[];

  const requestsUtilGetUniqueKeysWhereFactoryMock = jest.mocked(
    requestsUtilGetUniqueKeysWhereFactory,
  );
  const utilsGetFilterDateRangeMock = jest.mocked(utilsGetFilterDateRange);

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
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersServiceValidatorMock: Partial<UsersServiceValidator>;

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
    usersRepositoryMock = {
      create: usersRepositoryCreateMock,
      createQueryBuilder: usersRepositoryCreateQueryBuilderMock,
      findOneBy: usersRepositoryFindOneByMock,
      findBy: usersRepositoryFindByMock,
      save: usersRepositorySaveMock,
    };

    usersServiceValidatorMock = {};

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
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    requestsUtilGetUniqueKeysWhereFactoryMock.mockRestore();
    utilsGetFilterDateRangeMock.mockRestore();
  });

  it('Should create an instance of UsersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('checkIn', () => {
    let usersRepositoryFindOneByMockReturnValue: UsersEntity | null;
    it('', () => {});
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
        getUsersEntityFixture().username ?? '',
      );

      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        username: testUsersEntity.username,
      });
      expect(usersEntity).toEqual(testUsersEntity);
    });
  });

  describe('findMany', () => {
    let utilsGetFilterDateRangeMockReturnValue: [Date, Date];
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
        search: undefined,
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

    it('Should throw an error if a non empty uniqueKeys is passed, as well as a search term', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        uniqueKeys: {
          id: [1, 2, 3],
        },
        search: 'test_search',
      });
      await expect(usersService.findMany(usersDtoFindMany)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('Should call utilsGetFilterDateRangeMock with the passed createdAtRange, if it is defined, and filter the query by the resulting createdAt dates', async () => {
      utilsGetFilterDateRangeMockReturnValue = [
        new Date('2000-01-01'),
        new Date('2001-01-01'),
      ];
      utilsGetFilterDateRangeMock.mockReturnValue(
        utilsGetFilterDateRangeMockReturnValue,
      );

      usersDtoFindMany = getUsersDtoFindManyFixture({
        createdAtRange: ['testFrom', 'testTo'],
      });
      await usersService.findMany(usersDtoFindMany);

      expect(utilsGetFilterDateRangeMock).toHaveBeenNthCalledWith(
        1,
        (usersDtoFindMany.createdAtRange ?? [])[0],
        (usersDtoFindMany.createdAtRange ?? [])[1],
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        'created_at >= :createdAtFrom',
        {
          createdAtFrom: utilsGetFilterDateRangeMockReturnValue[0],
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        2,
        'created_at <= :createdAtTo',
        {
          createdAtTo: utilsGetFilterDateRangeMockReturnValue[1],
        },
      );
    });

    it('Should not call utilsGetFilterDateRangeMock or filter the query by createdAt dates if the createdAtRange param is not defined', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        createdAtRange: undefined,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(utilsGetFilterDateRangeMock).not.toHaveBeenCalled();
      expect(usersRepositoryQueryBuilderAndWhereMock).not.toHaveBeenCalled();
    });

    it('Should call utilsGetFilterDateRangeMock with the passed updatedAtRange, if it is defined, and filter the query by the resulting updatedAt dates', async () => {
      utilsGetFilterDateRangeMockReturnValue = [
        new Date('2000-01-01'),
        new Date('2001-01-01'),
      ];
      utilsGetFilterDateRangeMock.mockReturnValue(
        utilsGetFilterDateRangeMockReturnValue,
      );

      usersDtoFindMany = getUsersDtoFindManyFixture({
        updatedAtRange: ['testFrom', 'testTo'],
      });
      await usersService.findMany(usersDtoFindMany);

      expect(utilsGetFilterDateRangeMock).toHaveBeenNthCalledWith(
        1,
        (usersDtoFindMany.updatedAtRange ?? [])[0],
        (usersDtoFindMany.updatedAtRange ?? [])[1],
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        'updated_at >= :updatedAtFrom',
        {
          updatedAtFrom: utilsGetFilterDateRangeMockReturnValue[0],
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        2,
        'updated_at <= :updatedAtTo',
        {
          updatedAtTo: utilsGetFilterDateRangeMockReturnValue[1],
        },
      );
    });

    it('Should not call utilsGetFilterDateRangeMock or filter the query by updatedAt dates if the updatedAtRange param is not defined', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        updatedAtRange: undefined,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(utilsGetFilterDateRangeMock).not.toHaveBeenCalled();
      expect(usersRepositoryQueryBuilderAndWhereMock).not.toHaveBeenCalled();
    });

    it('Should call utilsGetFilterDateRangeMock with the passed deletedAtRange, if it is defined, and filter the query by the resulting deletedAt dates', async () => {
      utilsGetFilterDateRangeMockReturnValue = [
        new Date('2000-01-01'),
        new Date('2001-01-01'),
      ];
      utilsGetFilterDateRangeMock.mockReturnValue(
        utilsGetFilterDateRangeMockReturnValue,
      );

      usersDtoFindMany = getUsersDtoFindManyFixture({
        deletedAtRange: ['testFrom', 'testTo'],
      });
      await usersService.findMany(usersDtoFindMany);

      expect(utilsGetFilterDateRangeMock).toHaveBeenNthCalledWith(
        1,
        (usersDtoFindMany.deletedAtRange ?? [])[0],
        (usersDtoFindMany.deletedAtRange ?? [])[1],
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        1,
        'deleted_at >= :deletedAtFrom',
        {
          deletedAtFrom: utilsGetFilterDateRangeMockReturnValue[0],
        },
      );
      expect(usersRepositoryQueryBuilderAndWhereMock).toHaveBeenNthCalledWith(
        2,
        'deleted_at <= :deletedAtTo',
        {
          deletedAtTo: utilsGetFilterDateRangeMockReturnValue[1],
        },
      );
    });

    it('Should not call utilsGetFilterDateRangeMock or filter the query by deletedAt dates if the deletedAtRange param is not defined', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        deletedAtRange: undefined,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(utilsGetFilterDateRangeMock).not.toHaveBeenCalled();
      expect(usersRepositoryQueryBuilderAndWhereMock).not.toHaveBeenCalled();
    });

    it('Should filter the query by username, email, phoneNumber, firstName, middleName and lastName when the search param is passed', async () => {
      usersDtoFindMany = getUsersDtoFindManyFixture({
        search: 'test_search_term',
      });
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
      usersDtoFindMany = getUsersDtoFindManyFixture({
        sortBy: 'test_sort_by',
        sortOrder: 'desc',
      });
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
      usersDtoFindMany = getUsersDtoFindManyFixture({
        sortBy: 'test_sort_by',
        sortOrder: 'desc',
      });
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
      usersDtoFindMany = getUsersDtoFindManyFixture({
        page: 3,
        resultsPerPage: 10,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderSkipMock).toHaveBeenNthCalledWith(
        1,
        (usersDtoFindMany.resultsPerPage ?? 0) *
          ((usersDtoFindMany.page ?? 0) - 1),
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
      usersDtoFindMany = getUsersDtoFindManyFixture({
        page: 1,
        resultsPerPage: 10,
      });
      await usersService.findMany(usersDtoFindMany);

      expect(usersRepositoryQueryBuilderSkipMock).toHaveBeenNthCalledWith(1, 0);
      expect(usersRepositoryQueryBuilderTakeMock).toHaveBeenNthCalledWith(
        1,
        usersDtoFindMany.resultsPerPage,
      );
    });
  });
});
