import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  getUsersFindManyDtoFixture,
  getUsersUpdateOnePartialDtoFixture,
  getUsersEntityFixture,
} from './users.utils.fixtures';
import { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersEntity } from './users.entity';
import { UsersUpdateOnePartialDto } from './dtos/users.updateOnePartial.dto';

describe('UsersController', () => {
  const currentUser = getUsersEntityFixture({ id: 1000 });
  let usersEntities: UsersEntity[];
  let usersEntity: UsersEntity | null;

  let usersServiceFindOneMock: jest.Mock;
  let usersServiceFindManyMock: jest.Mock;
  let usersServiceUpdateOnePartialMock: jest.Mock;
  let usersServiceResetPasswordMock: jest.Mock;
  let usersServiceDeleteOneMock: jest.Mock;
  let usersServiceMock: Partial<UsersService>;
  let usersController: UsersController;

  beforeEach(async () => {
    usersServiceFindOneMock = jest.fn();
    usersServiceFindManyMock = jest.fn();
    usersServiceUpdateOnePartialMock = jest.fn();
    usersServiceResetPasswordMock = jest.fn();
    usersServiceDeleteOneMock = jest.fn();
    usersServiceMock = {
      findOne: usersServiceFindOneMock,
      findMany: usersServiceFindManyMock,
      updateOnePartial: usersServiceUpdateOnePartialMock,
      resetPassword: usersServiceResetPasswordMock,
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
    let testUsersFindManyDto: UsersFindManyDto;

    it('Should call usersService.findMany with a UsersFindManyDto, and return the found users', async () => {
      usersServiceFindManyMockReturnValue = [
        getUsersEntityFixture(),
        getUsersEntityFixture(),
      ];
      usersServiceFindManyMock.mockReturnValue(
        usersServiceFindManyMockReturnValue,
      );

      testUsersFindManyDto = getUsersFindManyDtoFixture();
      usersEntities = await usersController.findMany(testUsersFindManyDto);

      expect(usersServiceFindManyMock).toHaveBeenNthCalledWith(
        1,
        testUsersFindManyDto,
      );
      expect(usersEntities).toEqual(usersServiceFindManyMockReturnValue);
    });
  });

  describe('updateOnePartial', () => {
    let usersServiceUpdateOnePartialMockReturnValue: UsersEntity;
    let testUsersUpdateOnePartialDto: UsersUpdateOnePartialDto;

    it('Should call usersService.updateOnePartial with a UsersUpdateOnePartialDto, the currentUser, and return the updated users', async () => {
      usersServiceUpdateOnePartialMockReturnValue = getUsersEntityFixture();
      usersServiceUpdateOnePartialMock.mockReturnValue(
        usersServiceUpdateOnePartialMockReturnValue,
      );

      testUsersUpdateOnePartialDto = getUsersUpdateOnePartialDtoFixture();
      usersEntity = await usersController.updateOnePartial(
        testUsersUpdateOnePartialDto,
        currentUser,
      );

      expect(usersServiceUpdateOnePartialMock).toHaveBeenNthCalledWith(
        1,
        testUsersUpdateOnePartialDto,
        currentUser,
      );
      expect(usersEntity).toEqual(usersServiceUpdateOnePartialMockReturnValue);
    });
  });

  describe('resetPassword', () => {
    it('Should call usersService.resetPassword with the currentUser', async () => {
      await usersController.resetPassword(currentUser);

      expect(usersServiceResetPasswordMock).toHaveBeenNthCalledWith(
        1,
        currentUser,
      );
    });
  });

  describe('deleteOne', () => {
    it('Should call usersService.deleteOne with the currentUser', async () => {
      await usersController.deleteOne(currentUser);

      expect(usersServiceDeleteOneMock).toHaveBeenNthCalledWith(1, currentUser);
    });
  });
});
