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
import { UpdateManyEntitiesObjectDto } from '../../../../api-nest-utils/src';

describe('UsersController', () => {
  const currentUser = getUsersEntityFixture();
  const currentPassword = 'current_password';
  const testUserId1 = 1;
  const testUserId2 = 2;
  let usersServiceUpdateManyPartialMockReturnValue: UsersEntity[];
  let usersDtoUpdateManyPartialObject: UpdateManyEntitiesObjectDto<
    UsersEntity,
    UsersDtoUpdateOnePartial
  >;

  let usersServiceCreateManyMock: jest.Mock;
  let usersServiceFindOneMock: jest.Mock;
  let usersServiceFindManyMock: jest.Mock;
  let usersServiceUpdateManyPartialMock: jest.Mock;
  let usersServiceDeleteManyMock: jest.Mock;
  let usersServiceMock: Partial<UsersService>;
  let usersController: UsersController;

  beforeEach(async () => {
    usersServiceCreateManyMock = jest.fn();
    usersServiceFindOneMock = jest.fn();
    usersServiceFindManyMock = jest.fn();
    usersServiceUpdateManyPartialMock = jest.fn();
    usersServiceDeleteManyMock = jest.fn();
    usersServiceMock = {
      createMany: usersServiceCreateManyMock,
      findOne: usersServiceFindOneMock,
      findMany: usersServiceFindManyMock,
      updateManyPartial: usersServiceUpdateManyPartialMock,
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
    let usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[];

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated user', async () => {
      usersServiceUpdateManyPartialMockReturnValue = [
        getUsersEntityFixture({ id: testUserId1 }),
        getUsersEntityFixture({ id: testUserId2 }),
      ];
      usersServiceUpdateManyPartialMock.mockReturnValue(
        usersServiceUpdateManyPartialMockReturnValue,
      );

      usersDtoUpdateOneWholeArray = [
        getUsersDtoUpdateOneWholeFixture({
          id: usersServiceUpdateManyPartialMockReturnValue[0].id,
        }),
        getUsersDtoUpdateOneWholeFixture({
          id: usersServiceUpdateManyPartialMockReturnValue[1].id,
        }),
      ];
      const usersEntities = await usersController.updateManyWhole(
        usersDtoUpdateOneWholeArray,
        currentUser,
        currentPassword,
      );

      usersDtoUpdateManyPartialObject = {
        [usersDtoUpdateOneWholeArray[0].id]: usersDtoUpdateOneWholeArray[0],
        [usersDtoUpdateOneWholeArray[1].id]: usersDtoUpdateOneWholeArray[1],
      };
      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );
      expect(usersEntities).toEqual(
        usersServiceUpdateManyPartialMockReturnValue,
      );
    });
  });

  describe('updateOnePartial', () => {
    let usersDtoUpdateOnePartial: UsersDtoUpdateOnePartial;

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated user', async () => {
      usersServiceUpdateManyPartialMockReturnValue = [
        getUsersEntityFixture({ id: testUserId1 }),
      ];
      usersServiceUpdateManyPartialMock.mockReturnValue(
        usersServiceUpdateManyPartialMockReturnValue,
      );

      const userId = usersServiceUpdateManyPartialMockReturnValue[0].id;
      usersDtoUpdateOnePartial = getUsersDtoUpdateOnePartialFixture();
      const usersEntity = await usersController.updateOnePartial(
        userId,
        usersDtoUpdateOnePartial,
        currentUser,
        currentPassword,
      );

      usersDtoUpdateManyPartialObject = {
        [userId]: usersDtoUpdateOnePartial,
      };
      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );
      expect(usersEntity).toEqual(
        usersServiceUpdateManyPartialMockReturnValue[0],
      );
    });
  });

  describe('updateManyPartial', () => {
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
        currentUser,
        currentPassword,
      );

      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject,
        currentUser,
        currentPassword,
      );
      expect(usersEntities).toEqual(
        usersServiceUpdateManyPartialMockReturnValue,
      );
    });
  });

  describe('updateManyPartialWithPattern', () => {
    let usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern;

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated users', async () => {
      usersServiceUpdateManyPartialMockReturnValue = [
        getUsersEntityFixture({ id: testUserId1 }),
        getUsersEntityFixture({ id: testUserId2 }),
      ];
      usersServiceUpdateManyPartialMock.mockReturnValue(
        usersServiceUpdateManyPartialMockReturnValue,
      );

      usersDtoUpdateOnePartialWithPattern = {
        ids: [
          usersServiceUpdateManyPartialMockReturnValue[0].id,
          usersServiceUpdateManyPartialMockReturnValue[1].id,
        ],
        dtoUpdateOnePartial: getUsersDtoUpdateOnePartialFixture(),
      };
      const usersEntities = await usersController.updateManyPartialWithPattern(
        usersDtoUpdateOnePartialWithPattern,
        currentUser,
      );

      usersDtoUpdateManyPartialObject = {
        [usersDtoUpdateOnePartialWithPattern.ids[0]]:
          usersDtoUpdateOnePartialWithPattern.dtoUpdateOnePartial,
        [usersDtoUpdateOnePartialWithPattern.ids[1]]:
          usersDtoUpdateOnePartialWithPattern.dtoUpdateOnePartial,
      };
      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject,
        currentUser,
      );
      expect(usersEntities).toEqual(
        usersServiceUpdateManyPartialMockReturnValue,
      );
    });
  });

  describe('deleteOne', () => {
    it('Should call usersService.deleteMany, with an array of user ids', async () => {
      await usersController.deleteOne(
        testUserId1,
        currentUser,
        currentPassword,
      );

      expect(usersServiceDeleteManyMock).toHaveBeenNthCalledWith(
        1,
        [testUserId1],
        currentUser,
        currentPassword,
      );
    });
  });

  describe('deleteMany', () => {
    let usersDtoDeleteMany: UsersDtoDeleteMany;

    it('Should call usersService.deleteMany, with an array of user ids', async () => {
      usersDtoDeleteMany = {
        ids: [1, 2],
      };
      await usersController.deleteMany(usersDtoDeleteMany, currentUser);

      expect(usersServiceDeleteManyMock).toHaveBeenNthCalledWith(
        1,
        usersDtoDeleteMany.ids,
        currentUser,
      );
    });
  });
});
