import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  getUsersDtoFindManyFixture,
  getUsersDtoUpdateOnePartialFixture,
  getUsersDtoUpdateOneWholeFixture,
  getUsersEntityFixture,
} from './users.utils.fixtures';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersEntity } from './users.entity';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';

describe('UsersController', () => {
  let usersServiceCreateManyMock: jest.Mock;
  let usersServiceFindOneMock: jest.Mock;
  let usersServiceFindManyMock: jest.Mock;
  let usersServiceUpdateManyWholeMock: jest.Mock;
  let usersServiceUpdateManyPartialMock: jest.Mock;
  let usersServiceUpdateManyPartialWithPatternMock: jest.Mock;
  let usersServiceDeleteManyMock: jest.Mock;
  let usersServiceMock: Partial<UsersService>;
  let usersController: UsersController;

  beforeEach(async () => {
    usersServiceCreateManyMock = jest.fn();
    usersServiceFindOneMock = jest.fn();
    usersServiceFindManyMock = jest.fn();
    usersServiceUpdateManyWholeMock = jest.fn();
    usersServiceUpdateManyPartialMock = jest.fn();
    usersServiceUpdateManyPartialWithPatternMock = jest.fn();
    usersServiceDeleteManyMock = jest.fn();
    usersServiceMock = {
      createMany: usersServiceCreateManyMock,
      findOne: usersServiceFindOneMock,
      findMany: usersServiceFindManyMock,
      updateManyWhole: usersServiceUpdateManyWholeMock,
      updateManyPartial: usersServiceUpdateManyPartialMock,
      updateManyPartialWithPattern:
        usersServiceUpdateManyPartialWithPatternMock,
      deleteMany: usersServiceDeleteManyMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
      controllers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('Should create an instance of UsersController', () => {
    expect(usersController).toBeDefined();
  });

  describe('findOne', () => {
    let usersServiceFindOneMockReturnValue: UsersEntity;

    it('Should call usersService.findOne, with id as uniqueKeyName when none is passed as query param, and return the found user', async () => {
      usersServiceFindOneMockReturnValue = getUsersEntityFixture();
      usersServiceFindOneMock.mockReturnValue(
        usersServiceFindOneMockReturnValue,
      );

      const usersEntity = await usersController.findOne(
        usersServiceFindOneMockReturnValue.id,
      );

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'id',
        usersServiceFindOneMockReturnValue.id,
      );
      expect(usersEntity).toEqual(usersServiceFindOneMockReturnValue);
    });

    it('Should call usersService.findOne, with passed uniqueKeyName param, and return the found user', async () => {
      usersServiceFindOneMockReturnValue = getUsersEntityFixture();
      usersServiceFindOneMock.mockReturnValue(
        usersServiceFindOneMockReturnValue,
      );

      const usersEntity = await usersController.findOne(
        usersServiceFindOneMockReturnValue.username,
        'username',
      );

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        usersServiceFindOneMockReturnValue.username,
      );
      expect(usersEntity).toEqual(usersServiceFindOneMockReturnValue);
    });
  });

  describe('findMany', () => {
    let usersServiceFindManyMockReturnValue: UsersEntity[];
    let testUsersDtoFindMany: UsersDtoFindMany;

    it('Should call usersService.findMany, with filter and search metadata, and return the found users', async () => {
      usersServiceFindManyMockReturnValue = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersServiceFindManyMock.mockReturnValue(
        usersServiceFindManyMockReturnValue,
      );

      testUsersDtoFindMany = getUsersDtoFindManyFixture();
      const usersEntities = await usersController.findMany(
        testUsersDtoFindMany,
      );

      expect(usersServiceFindManyMock).toHaveBeenNthCalledWith(
        1,
        testUsersDtoFindMany,
      );
      expect(usersEntities).toEqual(usersServiceFindManyMockReturnValue);
    });
  });

  describe('updateManyWhole', () => {
    let usersServiceUpdateManyWholeMockReturnValue: UsersEntity[];
    let usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[];

    it('Should call usersService.updateManyWhole, with array of users to update, and return the updated users', async () => {
      usersServiceUpdateManyWholeMockReturnValue = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersServiceUpdateManyWholeMock.mockReturnValue(
        usersServiceUpdateManyWholeMockReturnValue,
      );

      usersDtoUpdateOneWholeArray = [
        getUsersDtoUpdateOneWholeFixture(),
        getUsersDtoUpdateOneWholeFixture(),
      ];
      const usersEntities = await usersController.updateManyWhole(
        usersDtoUpdateOneWholeArray,
      );

      expect(usersServiceUpdateManyWholeMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateOneWholeArray,
      );
      expect(usersEntities).toEqual(usersServiceUpdateManyWholeMockReturnValue);
    });
  });

  describe('updateOnePartial', () => {
    let usersServiceUpdateManyPartialMockReturnValue: UsersEntity[];
    let usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial;

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated user', async () => {
      usersServiceUpdateManyPartialMockReturnValue = [getUsersEntityFixture()];
      usersServiceUpdateManyPartialMock.mockReturnValue(
        usersServiceUpdateManyPartialMockReturnValue,
      );

      usersDtoUpdateOnePartial = getUsersDtoUpdateOnePartialFixture();
      const usersEntity = await usersController.updateOnePartial(
        usersServiceUpdateManyPartialMockReturnValue[0].id,
        usersDtoUpdateOnePartial,
      );

      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(1, {
        [usersServiceUpdateManyPartialMockReturnValue[0].id]:
          usersDtoUpdateOnePartial,
      });
      expect(usersEntity).toEqual(
        usersServiceUpdateManyPartialMockReturnValue[0],
      );
    });
  });

  describe('updateManyPartial', () => {
    const testUserId1 = 1;
    const testUserId2 = 2;
    let usersServiceUpdateManyPartialMockReturnValue: UsersEntity[];
    let usersDtoUpdateManyPartialObject: Record<
      UsersEntity['id'],
      UsersDtoUpdateOnePartial
    >;

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated users', async () => {
      usersServiceUpdateManyPartialMockReturnValue = [
        getUsersEntityFixture({ id: testUserId1 }),
        getUsersEntityFixture({ id: testUserId2 }),
      ];
      usersServiceUpdateManyPartialMock.mockReturnValue(
        usersServiceUpdateManyPartialMockReturnValue,
      );

      usersDtoUpdateManyPartialObject = {
        [testUserId1]: getUsersDtoUpdateOnePartialFixture(),
        [testUserId2]: getUsersDtoUpdateOnePartialFixture(),
      };
      const usersEntities = await usersController.updateManyPartial(
        usersDtoUpdateManyPartialObject,
      );

      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject,
      );
      expect(usersEntities).toEqual(
        usersServiceUpdateManyPartialMockReturnValue,
      );
    });
  });

  describe('updateManyPartialWithPattern', () => {
    const testUserId1 = 1;
    const testUserId2 = 2;
    let usersServiceUpdateManyPartialWithPatternMockReturnValue: UsersEntity[];
    let usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern;

    it('Should call usersService.updateManyPartialWithPattern, with an array of user ids and a partial user pattern, and return the updated users', async () => {
      usersServiceUpdateManyPartialWithPatternMockReturnValue = [
        getUsersEntityFixture({ id: testUserId1 }),
        getUsersEntityFixture({ id: testUserId2 }),
      ];
      usersServiceUpdateManyPartialWithPatternMock.mockReturnValue(
        usersServiceUpdateManyPartialWithPatternMockReturnValue,
      );

      usersDtoUpdateOnePartialWithPattern = {
        ids: [testUserId1, testUserId2],
        dtoUpdateOnePartial: getUsersDtoUpdateOnePartialFixture(),
      };
      const usersEntities = await usersController.updateManyPartialWithPattern(
        usersDtoUpdateOnePartialWithPattern,
      );

      expect(
        usersServiceUpdateManyPartialWithPatternMock,
      ).toHaveBeenNthCalledWith(1, usersDtoUpdateOnePartialWithPattern);
      expect(usersEntities).toEqual(
        usersServiceUpdateManyPartialWithPatternMockReturnValue,
      );
    });
  });

  describe('deleteOne', () => {
    const testUserId = 1;

    it('Should call usersService.deleteMany, with an array of user ids', async () => {
      await usersController.deleteOne(testUserId);

      expect(usersServiceDeleteManyMock).toHaveBeenNthCalledWith(1, {
        ids: [testUserId],
      });
    });
  });

  describe('deleteMany', () => {
    let usersDtoDeleteMany: UsersDtoDeleteMany;

    it('Should call usersService.deleteMany, with an array of user ids', async () => {
      usersDtoDeleteMany = {
        ids: [1, 2],
      };
      await usersController.deleteMany(usersDtoDeleteMany);

      expect(usersServiceDeleteManyMock).toHaveBeenNthCalledWith(
        1,
        usersDtoDeleteMany,
      );
    });
  });
});
