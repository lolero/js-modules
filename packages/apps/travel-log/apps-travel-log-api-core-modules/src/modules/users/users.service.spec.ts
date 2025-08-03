import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  RequestEntity,
  utilApplyFindManyFiltersToQuery,
  utilApplyFindManySortingAndPaginationToQuery,
} from '@js-modules/api-nest-utils';
import {
  KeycloakAdminClient,
  UserRepresentation,
  Users,
} from '@js-modules/api-nest-keycloak-admin-client-cjs';
import { KEYCLOAK_ADMIN_CLIENT } from '@js-modules/api-nest-module-auth-keycloak';
import { KeycloakTokenParsed } from 'keycloak-js';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import {
  getUsersFindManyDtoFixture,
  getUsersEntityFixture,
  getKeycloakUserFixture,
  getKeycloakUserRepresentationFixture,
  getUsersUpdateOnePartialDtoFixture,
} from './users.utils.fixtures';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersServiceUtils } from './users.service.utils';
import { KeycloakUser } from './users.types';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';

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
  let usersEntity: UsersEntity | null;
  let usersEntities: UsersEntity[];

  const utilApplyFindManyFiltersToQueryMock = jest.mocked(
    utilApplyFindManyFiltersToQuery,
  );
  const utilApplyFindManySortingAndPaginationToQueryMock = jest.mocked(
    utilApplyFindManySortingAndPaginationToQuery,
  );

  let usersRepositoryCreateQueryBuilderMock: jest.Mock;
  let usersRepositoryQueryBuilderGetManyAndCountMock: jest.Mock;
  let usersRepositoryQueryBuilderMock: Partial<SelectQueryBuilder<UsersEntity>>;
  let usersRepositoryCreateMock: jest.Mock;
  let usersRepositoryFindOneByMock: jest.Mock;
  let usersRepositorySaveMock: jest.Mock;
  let usersRepositorySoftRemoveMock: jest.Mock;
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersServiceUtilsGetKeycloakUserFromTokenParsedMock: jest.Mock;
  let usersServiceUtilsGetUpdatedKeycloakUserRepresentationMock: jest.Mock;
  let usersServiceUtilsMock: Partial<UsersServiceUtils>;

  let keycloakAdminClientUsersFindOneMock: jest.Mock;
  let keycloakAdminClientUsersUpdateMock: jest.Mock;
  let keycloakAdminClientUsersExecuteActionsEmailMock: jest.Mock;
  let keycloakAdminClientMock: Partial<KeycloakAdminClient>;

  let usersService: UsersService;

  beforeEach(async () => {
    usersRepositoryQueryBuilderMock = {
      getManyAndCount: jest.fn(),
    };
    usersRepositoryCreateQueryBuilderMock = jest
      .fn()
      .mockReturnValue(usersRepositoryQueryBuilderMock);
    usersRepositoryQueryBuilderGetManyAndCountMock = jest.fn();
    Object.assign(usersRepositoryQueryBuilderMock, {
      getManyAndCount: usersRepositoryQueryBuilderGetManyAndCountMock,
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
    usersRepositorySoftRemoveMock = jest.fn();
    usersRepositoryMock = {
      create: usersRepositoryCreateMock,
      createQueryBuilder: usersRepositoryCreateQueryBuilderMock,
      findOneBy: usersRepositoryFindOneByMock,
      save: usersRepositorySaveMock,
      softRemove: usersRepositorySoftRemoveMock,
    };

    usersServiceUtilsGetKeycloakUserFromTokenParsedMock = jest.fn();
    usersServiceUtilsGetUpdatedKeycloakUserRepresentationMock = jest.fn();
    usersServiceUtilsMock = {
      getKeycloakUserFromTokenParsed:
        usersServiceUtilsGetKeycloakUserFromTokenParsedMock,
      getUpdatedKeycloakUserRepresentation:
        usersServiceUtilsGetUpdatedKeycloakUserRepresentationMock,
    };

    keycloakAdminClientUsersFindOneMock = jest.fn();
    keycloakAdminClientUsersUpdateMock = jest.fn();
    keycloakAdminClientUsersExecuteActionsEmailMock = jest.fn();
    keycloakAdminClientMock = {
      users: {
        findOne: keycloakAdminClientUsersFindOneMock,
        update: keycloakAdminClientUsersUpdateMock,
        executeActionsEmail: keycloakAdminClientUsersExecuteActionsEmailMock,
      } as unknown as Users,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UsersEntity),
          useFactory: () => usersRepositoryMock,
        },
        {
          provide: UsersServiceUtils,
          useValue: usersServiceUtilsMock,
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
    let usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue: KeycloakUser;
    let usersRepositoryFindOneByMockReturnValue: UsersEntity | null;
    let usersRepositoryCreateMockReturnValue: UsersEntity;

    it('Should call usersServiceUtils.getKeycloakUserFromTokenParsed and usersRepository.findOneBy with the keycloak id from the parsed token', async () => {
      usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue =
        getKeycloakUserFixture();
      usersServiceUtilsGetKeycloakUserFromTokenParsedMock.mockReturnValue(
        usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      );

      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const keycloakTokenParsed: KeycloakTokenParsed = {
        sub: 'test_sub',
      };
      usersEntity = await usersService.checkIn(keycloakTokenParsed);

      expect(
        usersServiceUtilsGetKeycloakUserFromTokenParsedMock,
      ).toHaveBeenNthCalledWith(1, keycloakTokenParsed);
      expect(usersRepositoryFindOneByMock).toHaveBeenNthCalledWith(1, {
        keycloakId:
          usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue.keycloakId,
      });
    });

    it('Should call usersRepository.create and usersRepository.save,  if a user with the keycloakId is not found,  and return the created user', async () => {
      usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue =
        getKeycloakUserFixture();
      usersServiceUtilsGetKeycloakUserFromTokenParsedMock.mockReturnValue(
        usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      );

      usersRepositoryFindOneByMockReturnValue = null;
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      usersRepositoryCreateMockReturnValue = getUsersEntityFixture();
      usersRepositoryCreateMock.mockReturnValue(
        usersRepositoryCreateMockReturnValue,
      );

      const keycloakTokenParsed: KeycloakTokenParsed = {
        sub: 'test_sub',
      };
      usersEntity = await usersService.checkIn(keycloakTokenParsed);

      expect(usersRepositoryCreateMock).toHaveBeenNthCalledWith(
        1,
        usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        usersRepositoryCreateMockReturnValue,
      );
      expect(usersEntity).toBe(usersRepositoryCreateMockReturnValue);
    });

    it('Should not call usersRepository.create but call usersRepository.save, if a user with the keycloakId is found with outdated metadata, and return the updated user', async () => {
      usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue =
        getKeycloakUserFixture({ firstName: 'new_first_name' });
      usersServiceUtilsGetKeycloakUserFromTokenParsedMock.mockReturnValue(
        usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      );

      usersRepositoryFindOneByMockReturnValue = getUsersEntityFixture();
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const keycloakTokenParsed: KeycloakTokenParsed = {
        sub: 'test_sub',
      };
      usersEntity = await usersService.checkIn(keycloakTokenParsed);

      expect(usersRepositoryCreateMock).not.toHaveBeenCalled();
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(1, {
        ...usersRepositoryFindOneByMockReturnValue,
        ...usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      });
      expect(usersEntity).toEqual({
        ...usersRepositoryFindOneByMockReturnValue,
        ...usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      });
    });

    it('Should not call usersRepository.create or usersRepository.save, if a user with the keycloakId is found with no outdated metadata, and return the found user', async () => {
      usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue =
        getKeycloakUserFixture();
      usersServiceUtilsGetKeycloakUserFromTokenParsedMock.mockReturnValue(
        usersServiceUtilsGetKeycloakUserFromTokenParsedMockReturnValue,
      );

      usersRepositoryFindOneByMockReturnValue = getUsersEntityFixture();
      usersRepositoryFindOneByMock.mockReturnValue(
        usersRepositoryFindOneByMockReturnValue,
      );

      const keycloakTokenParsed: KeycloakTokenParsed = {
        sub: 'test_sub',
      };
      usersEntity = await usersService.checkIn(keycloakTokenParsed);

      expect(usersRepositoryCreateMock).not.toHaveBeenCalled();
      expect(usersRepositorySaveMock).not.toHaveBeenCalled();
      expect(usersEntity).toBe(usersRepositoryFindOneByMockReturnValue);
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

      usersEntity = await usersService.findOne(
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
    let usersRepositoryQueryBuilderGetManyAndCountMockReturnValue: [
      UsersEntity[],
      number,
    ];
    let usersFindManyDto: UsersFindManyDto;

    it('Should create a query builder, call utilApplyFindManyFiltersToQuery with the query builder and the passed UsersFindManyDto, call utilApplyFindManySortingAndPaginationToQuery with the updated query builder and the passed UsersFindManyDto, and return the found users', async () => {
      const testUsersEntities = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersRepositoryQueryBuilderGetManyAndCountMockReturnValue = [
        testUsersEntities,
        10,
      ];
      usersRepositoryQueryBuilderGetManyAndCountMock.mockReturnValue(
        usersRepositoryQueryBuilderGetManyAndCountMockReturnValue,
      );

      usersFindManyDto = getUsersFindManyDtoFixture();
      const { entities, total } = await usersService.findMany(usersFindManyDto);
      usersEntities = entities;

      expect(usersRepositoryCreateQueryBuilderMock).toHaveBeenCalledTimes(1);
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
      expect(
        usersRepositoryQueryBuilderGetManyAndCountMock,
      ).toHaveBeenNthCalledWith(1);
      expect(usersEntities).toEqual(testUsersEntities);
      expect(total).toBe(10);
    });
  });

  describe('updateOnePartial', () => {
    let usersUpdateOnePartialDto: UsersUpdateOnePartialDto;
    let keycloakAdminClientUsersFindOneMockReturnValue: UserRepresentation;
    let usersServiceUtilsGetUpdatedKeycloakUserRepresentationMockReturnValue: UserRepresentation;

    it('Should not call keycloakAdminClient.users.findOne, usersServiceUtils.getUpdatedKeycloakUserRepresentation, keycloakAdminClient.users.update, or usersRepository.save, if no user fields are changed, and return the authenticated user', async () => {
      const testUsersEntity = getUsersEntityFixture();
      usersUpdateOnePartialDto = getUsersUpdateOnePartialDtoFixture({
        username: testUsersEntity.username,
        firstName: testUsersEntity.firstName,
        lastName: testUsersEntity.lastName,
      });
      usersEntity = await usersService.updateOnePartial(
        usersUpdateOnePartialDto,
        testUsersEntity,
      );

      expect(keycloakAdminClientUsersFindOneMock).not.toHaveBeenCalled();
      expect(
        usersServiceUtilsGetUpdatedKeycloakUserRepresentationMock,
      ).not.toHaveBeenCalled();
      expect(keycloakAdminClientUsersUpdateMock).not.toHaveBeenCalled();
      expect(usersRepositorySaveMock).not.toHaveBeenCalled();
      expect(usersEntity).toBe(testUsersEntity);
    });

    it('Should call keycloakAdminClient.users.findOne, usersServiceUtils.getUpdatedKeycloakUserRepresentation, keycloakAdminClient.users.update, and usersRepository.save, if user fields are changed, and return the updated authenticated user', async () => {
      keycloakAdminClientUsersFindOneMockReturnValue =
        getKeycloakUserRepresentationFixture();
      keycloakAdminClientUsersFindOneMock.mockReturnValue(
        keycloakAdminClientUsersFindOneMockReturnValue,
      );

      usersServiceUtilsGetUpdatedKeycloakUserRepresentationMockReturnValue = {
        id: 'updated_keycloak_id',
      };
      usersServiceUtilsGetUpdatedKeycloakUserRepresentationMock.mockReturnValue(
        usersServiceUtilsGetUpdatedKeycloakUserRepresentationMockReturnValue,
      );

      const testUsersEntity = getUsersEntityFixture();
      usersUpdateOnePartialDto = getUsersUpdateOnePartialDtoFixture({
        username: 'new_username',
      });
      usersEntity = await usersService.updateOnePartial(
        usersUpdateOnePartialDto,
        testUsersEntity,
      );

      expect(keycloakAdminClientUsersFindOneMock).toHaveBeenNthCalledWith(1, {
        id: testUsersEntity.keycloakId,
      });
      expect(
        usersServiceUtilsGetUpdatedKeycloakUserRepresentationMock,
      ).toHaveBeenNthCalledWith(
        1,
        keycloakAdminClientUsersFindOneMockReturnValue,
        usersUpdateOnePartialDto,
      );
      expect(keycloakAdminClientUsersUpdateMock).toHaveBeenNthCalledWith(
        1,
        {
          id: testUsersEntity.keycloakId,
        },
        usersServiceUtilsGetUpdatedKeycloakUserRepresentationMockReturnValue,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(1, {
        ...testUsersEntity,
        ...usersUpdateOnePartialDto,
      });
      expect(usersEntity).toEqual({
        ...testUsersEntity,
        ...usersUpdateOnePartialDto,
      });
    });
  });

  describe('resetPassword', () => {
    it('Should call keycloakAdminClient.users.executeActionsEmail', async () => {
      const testUsersEntity = getUsersEntityFixture();

      await usersService.resetPassword(testUsersEntity);

      expect(
        keycloakAdminClientUsersExecuteActionsEmailMock,
      ).toHaveBeenNthCalledWith(1, {
        id: testUsersEntity.keycloakId,
        actions: ['UPDATE_PASSWORD'],
      });
    });
  });

  describe('deleteOne', () => {
    it('Should call usersRepository.softRemove with the passed UsersEntity', async () => {
      const testUsersEntity = getUsersEntityFixture();

      await usersService.deleteOne(testUsersEntity);

      expect(usersRepositorySoftRemoveMock).toHaveBeenNthCalledWith(
        1,
        testUsersEntity,
      );
    });
  });
});
