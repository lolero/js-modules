import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  getUsersDtoFindManyFixture,
  getUsersEntityFixture,
} from './users.utils.fixtures';
import { UsersDtoUpdateOneWhole } from './users.dto.updateOneWhole';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersEntity } from './users.entity';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';
import { UsersDtoUpdateOnePartialWithPattern } from './users.dto.updateManyPartialWithPattern';
import { UsersDtoDeleteMany } from './users.dto.deleteMany';

describe('UsersController', () => {
  let testUsersEntity: UsersEntity;
  let testUsersEntities: UsersEntity[];
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
    testUsersEntity = getUsersEntityFixture();
    testUsersEntities = [testUsersEntity, testUsersEntity];
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
    it('Should call usersService.findOne, with id as uniqueKeyName when none is passed as query param, and return the found user', async () => {
      usersServiceFindOneMock.mockReturnValue(testUsersEntity);

      const usersEntity = await usersController.findOne(testUsersEntity.id);

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'id',
        testUsersEntity.id,
      );

      expect(usersEntity).toEqual(testUsersEntity);
    });

    it('Should call usersService.findOne, with passed uniqueKeyName param, and return the found user', async () => {
      usersServiceFindOneMock.mockReturnValue(testUsersEntity);

      const usersEntity = await usersController.findOne(
        testUsersEntity.username,
        'username',
      );

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'username',
        testUsersEntity.username,
      );

      expect(usersEntity).toEqual(testUsersEntity);
    });
  });

  describe('findMany', () => {
    let testUsersDtoFindMany: UsersDtoFindMany;

    beforeEach(() => {
      testUsersDtoFindMany = getUsersDtoFindManyFixture();
    });

    it('Should call usersService.findMany, with filter and search metadata, and return the found users', async () => {
      usersServiceFindManyMock.mockReturnValue(testUsersEntities);

      const usersEntities = await usersController.findMany(
        testUsersDtoFindMany,
      );

      expect(usersServiceFindManyMock).toHaveBeenNthCalledWith(
        1,
        testUsersDtoFindMany,
      );
      expect(usersEntities).toEqual(testUsersEntities);
    });
  });

  describe('updateManyWhole', () => {
    let usersDtoUpdateOneWholeArray: UsersDtoUpdateOneWhole[];

    beforeEach(() => {
      usersDtoUpdateOneWholeArray = [testUsersEntity, testUsersEntity];
    });

    it('Should call usersService.updateManyWhole, with array of users to update, and return the updated users', async () => {
      usersServiceUpdateManyWholeMock.mockReturnValue(testUsersEntities);

      const usersEntities = await usersController.updateManyWhole(
        usersDtoUpdateOneWholeArray,
      );

      expect(usersServiceUpdateManyWholeMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateOneWholeArray,
      );
      expect(usersEntities).toEqual(testUsersEntities);
    });
  });

  describe('updateOnePartial', () => {
    let usersDtoUpdateOnePartial: UsersDtoUpdateOneWhole;

    beforeEach(() => {
      usersDtoUpdateOnePartial = testUsersEntity;
    });

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated user', async () => {
      usersServiceUpdateManyPartialMock.mockReturnValue([testUsersEntity]);

      const usersEntity = await usersController.updateOnePartial(
        testUsersEntity.id,
        usersDtoUpdateOnePartial,
      );

      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(1, {
        [testUsersEntity.id]: usersDtoUpdateOnePartial,
      });
      expect(usersEntity).toEqual(testUsersEntity);
    });
  });

  describe('updateManyPartial', () => {
    let usersDtoUpdateManyPartialObject: Record<
      UsersEntity['id'],
      UsersDtoUpdateOnePartial
    >;

    beforeEach(() => {
      usersDtoUpdateManyPartialObject = {
        [testUsersEntity.id]: testUsersEntity,
        [testUsersEntity.id]: testUsersEntity,
      };
    });

    it('Should call usersService.updateManyPartial, with an object of partial users indexed by id, and return the updated users', async () => {
      usersServiceUpdateManyPartialMock.mockReturnValue(testUsersEntities);

      const usersEntities = await usersController.updateManyPartial(
        usersDtoUpdateManyPartialObject,
      );

      expect(usersServiceUpdateManyPartialMock).toHaveBeenNthCalledWith(
        1,
        usersDtoUpdateManyPartialObject,
      );
      expect(usersEntities).toEqual(testUsersEntities);
    });
  });

  describe('updateManyPartialWithPattern', () => {
    let usersDtoUpdateOnePartialWithPattern: UsersDtoUpdateOnePartialWithPattern;

    beforeEach(() => {
      usersDtoUpdateOnePartialWithPattern = {
        ids: [testUsersEntity.id, testUsersEntity.id],
        dtoUpdateOnePartial: testUsersEntity,
      };
    });

    it('Should call usersService.updateManyPartialWithPattern, with an array of user ids and a partial user pattern, and return the updated users', async () => {
      usersServiceUpdateManyPartialWithPatternMock.mockReturnValue(
        testUsersEntities,
      );

      const usersEntities = await usersController.updateManyPartialWithPattern(
        usersDtoUpdateOnePartialWithPattern,
      );

      expect(
        usersServiceUpdateManyPartialWithPatternMock,
      ).toHaveBeenNthCalledWith(1, usersDtoUpdateOnePartialWithPattern);
      expect(usersEntities).toEqual(testUsersEntities);
    });
  });

  describe('deleteOne', () => {
    it('Should call usersService.deleteMany, with an array of user ids', async () => {
      await usersController.deleteOne(testUsersEntity.id);

      expect(usersServiceDeleteManyMock).toHaveBeenNthCalledWith(1, {
        ids: [testUsersEntity.id],
      });
    });
  });

  describe('deleteMany', () => {
    let usersDtoDeleteMany: UsersDtoDeleteMany;

    beforeEach(() => {
      usersDtoDeleteMany = {
        ids: [testUsersEntity.id, testUsersEntity.id],
      };
    });

    it('Should call usersService.deleteMany, with an array of user ids', async () => {
      await usersController.deleteMany(usersDtoDeleteMany);

      expect(usersServiceDeleteManyMock).toHaveBeenNthCalledWith(
        1,
        usersDtoDeleteMany,
      );
    });
  });
});
