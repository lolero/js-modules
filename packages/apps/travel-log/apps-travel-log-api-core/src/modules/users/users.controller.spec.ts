import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  getUsersDtoFindManyFixture,
  getUsersDtoUpdateOnePartialFixture,
  getUsersEntityFixture,
} from './users.utils.fixtures';
import { UsersDtoFindMany } from './users.dto.findMany';
import { UsersEntity } from './users.entity';
import { UsersDtoUpdateOnePartial } from './users.dto.updateOnePartial';

describe('UsersController', () => {
  const currentUser = getUsersEntityFixture({ id: 1000 });
  const currentPassword = 'test_current_password';
  let usersEntities: UsersEntity[];
  let usersEntity: UsersEntity | null;

  let usersServiceFindOneMock: jest.Mock;
  let usersServiceFindManyMock: jest.Mock;
  let usersServiceUpdateOnePartialMock: jest.Mock;
  let usersServiceDeleteOneMock: jest.Mock;
  let usersServiceMock: Partial<UsersService>;
  let usersController: UsersController;

  beforeEach(async () => {
    usersServiceFindOneMock = jest.fn();
    usersServiceFindManyMock = jest.fn();
    usersServiceUpdateOnePartialMock = jest.fn();
    usersServiceDeleteOneMock = jest.fn();
    usersServiceMock = {
      findOne: usersServiceFindOneMock,
      findMany: usersServiceFindManyMock,
      updateOnePartial: usersServiceUpdateOnePartialMock,
      deleteOne: usersServiceDeleteOneMock,
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

    it('Should call usersService.findOne with id as uniqueKeyName when none is passed as query param, and return the found user', async () => {
      usersServiceFindOneMockReturnValue = getUsersEntityFixture();
      usersServiceFindOneMock.mockReturnValue(
        usersServiceFindOneMockReturnValue,
      );

      usersEntity = await usersController.findOne(
        usersServiceFindOneMockReturnValue.id,
      );

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'id',
        usersServiceFindOneMockReturnValue.id,
      );
      expect(usersEntity).toEqual(usersServiceFindOneMockReturnValue);
    });

    it('Should call usersService.findOne with the passed uniqueKeyName param, and return the found user', async () => {
      usersServiceFindOneMockReturnValue = getUsersEntityFixture();
      usersServiceFindOneMock.mockReturnValue(
        usersServiceFindOneMockReturnValue,
      );

      usersEntity = await usersController.findOne(
        usersServiceFindOneMockReturnValue.username ?? '',
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

    it('Should call usersService.findMany with a UsersDtoFindMany, and return the found users', async () => {
      usersServiceFindManyMockReturnValue = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersServiceFindManyMock.mockReturnValue(
        usersServiceFindManyMockReturnValue,
      );

      testUsersDtoFindMany = getUsersDtoFindManyFixture();
      usersEntities = await usersController.findMany(testUsersDtoFindMany);

      expect(usersServiceFindManyMock).toHaveBeenNthCalledWith(
        1,
        testUsersDtoFindMany,
      );
      expect(usersEntities).toEqual(usersServiceFindManyMockReturnValue);
    });
  });

  describe('updateOnePartial', () => {
    let usersServiceUpdateOnePartialMockReturnValue: UsersEntity;
    let testUsersDtoUpdateOnePartial: UsersDtoUpdateOnePartial;

    it('Should call usersService.updateOnePartial with a UsersDtoUpdateOnePartial, the currentUser, and the submitted currentPassword, and return the updated users', async () => {
      usersServiceUpdateOnePartialMockReturnValue = getUsersEntityFixture();
      usersServiceUpdateOnePartialMock.mockReturnValue(
        usersServiceUpdateOnePartialMockReturnValue,
      );

      testUsersDtoUpdateOnePartial = getUsersDtoUpdateOnePartialFixture();
      usersEntity = await usersController.updateOnePartial(
        testUsersDtoUpdateOnePartial,
        currentUser,
        currentPassword,
      );

      expect(usersServiceUpdateOnePartialMock).toHaveBeenNthCalledWith(
        1,
        testUsersDtoUpdateOnePartial,
        currentUser,
        currentPassword,
      );
      expect(usersEntity).toEqual(usersServiceUpdateOnePartialMockReturnValue);
    });
  });

  describe('deleteOne', () => {
    it('Should call usersService.deleteOne with the currentUser and the submitted currentPassword', async () => {
      await usersController.deleteOne(currentUser, currentPassword);

      expect(usersServiceDeleteOneMock).toHaveBeenNthCalledWith(
        1,
        currentUser,
        currentPassword,
      );
    });
  });
});
