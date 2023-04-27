import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  RequestEntity,
  utilApplyFindManyFiltersToQuery,
  utilApplyFindManySortingAndPaginationToQuery,
} from '@js-modules/api-nest-utils';
import { KeycloakAdminClient } from '@js-modules/api-nest-keycloak-admin-client-cjs';
import { KEYCLOAK_ADMIN_CLIENT } from '@js-modules/api-nest-module-auth-keycloak';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import {
  getUsersFindManyDtoFixture,
  getUsersEntityFixture,
} from './users.utils.fixtures';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersServiceValidator } from './users.service.validator';

jest.mock('@js-modules/api-nest-utils', () => {
  const originalModule = jest.requireActual('@js-modules/api-nest-utils');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(),
    utilApplyFindManyFiltersToQuery: jest.fn(),
    utilApplyFindManySortingAndPaginationToQuery: jest.fn(),
  };
});

describe('UsersService', () => {
  let usersEntities: UsersEntity[];

  const utilApplyFindManyFiltersToQueryMock = jest.mocked(
    utilApplyFindManyFiltersToQuery,
  );
  const utilApplyFindManySortingAndPaginationToQueryMock = jest.mocked(
    utilApplyFindManySortingAndPaginationToQuery,
  );

  let usersRepositoryCreateQueryBuilderMock: jest.Mock;
  let usersRepositoryQueryBuilderGetRawManyMock: jest.Mock;
  let usersRepositoryQueryBuilderMock: Partial<SelectQueryBuilder<UsersEntity>>;
  let usersRepositoryCreateMock: jest.Mock;
  let usersRepositoryFindOneByMock: jest.Mock;
  let usersRepositorySaveMock: jest.Mock;
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersServiceValidatorMock: Partial<UsersServiceValidator>;

  let keycloakAdminClientMock: Partial<KeycloakAdminClient>;

  let usersService: UsersService;

  beforeEach(async () => {
    usersRepositoryQueryBuilderMock = {
      getRawMany: jest.fn(),
    };
    usersRepositoryCreateQueryBuilderMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderGetRawManyMock = jest.fn();
    Object.assign(usersRepositoryQueryBuilderMock, {
      getRawMany: usersRepositoryQueryBuilderGetRawManyMock,
    });
    utilApplyFindManyFiltersToQueryMock.mockReturnValue(
      usersRepositoryQueryBuilderMock as unknown as SelectQueryBuilder<RequestEntity>,
    );
    utilApplyFindManySortingAndPaginationToQueryMock.mockReturnValue(
      usersRepositoryQueryBuilderMock as unknown as SelectQueryBuilder<RequestEntity>,
    );
    usersRepositoryCreateMock = jest.fn();
    usersRepositoryFindOneByMock = jest.fn();
    usersRepositorySaveMock = jest
      .fn()
      .mockImplementation((usersEntitiesToSave) => usersEntitiesToSave);
    usersRepositoryMock = {
      create: usersRepositoryCreateMock,
      createQueryBuilder: usersRepositoryCreateQueryBuilderMock,
      findOneBy: usersRepositoryFindOneByMock,
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
        {
          provide: KEYCLOAK_ADMIN_CLIENT,
          useValue: keycloakAdminClientMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    utilApplyFindManyFiltersToQueryMock.mockRestore();
    utilApplyFindManySortingAndPaginationToQueryMock.mockRestore();
  });

  it('Should create an instance of UsersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('checkIn', () => {
    // let usersRepositoryFindOneByMockReturnValue: UsersEntity | null;
    // it('', () => {});
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
    let usersRepositoryQueryBuilderGetRawManyMockReturnValue: UsersEntity[];
    let usersFindManyDto: UsersFindManyDto;

    it('Should create a query builder, call utilApplyFindManyFiltersToQuery with the query builder and the passed UsersFindManyDto, call utilApplyFindManySortingAndPaginationToQuery with the updated query builder and the passed UsersFindManyDto, and return the found users', async () => {
      const testUsersEntities = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersRepositoryQueryBuilderGetRawManyMockReturnValue = testUsersEntities;
      usersRepositoryQueryBuilderGetRawManyMock.mockReturnValue(
        usersRepositoryQueryBuilderGetRawManyMockReturnValue,
      );

      usersFindManyDto = getUsersFindManyDtoFixture();
      usersEntities = await usersService.findMany(usersFindManyDto);

      expect(usersRepositoryCreateQueryBuilderMock).toHaveBeenNthCalledWith(1);
      expect(utilApplyFindManyFiltersToQueryMock).toHaveBeenNthCalledWith(
        1,
        usersRepositoryQueryBuilderMock,
        usersFindManyDto,
      );
      expect(
        utilApplyFindManySortingAndPaginationToQueryMock,
      ).toHaveBeenNthCalledWith(
        1,
        usersRepositoryQueryBuilderMock,
        usersFindManyDto,
      );
      expect(usersRepositoryQueryBuilderGetRawManyMock).toHaveBeenNthCalledWith(
        1,
      );
      expect(usersEntities).toEqual(testUsersEntities);
    });
  });
});
