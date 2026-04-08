import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { FindManyResponse } from '@js-modules/api-nest-utils';
import type { UsersFindManyDto } from './dtos/users.findMany.dto';
import { UsersController } from './users.controller';
import type { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import {
  getUsersEntityFixture,
  getUsersFindManyDtoFixture,
} from './users.utils.fixtures';

describe('UsersController', () => {
  let usersEntities: UsersEntity[];
  let usersEntity: UsersEntity | null;

  let usersServiceFindOneMock: jest.Mock;
  let usersServiceFindManyMock: jest.Mock;
  let usersServiceMock: UsersService;
  let usersController: UsersController;

  beforeEach(async () => {
    usersServiceFindOneMock = jest.fn();
    usersServiceFindManyMock = jest.fn();
    usersServiceMock = {
      findOne: usersServiceFindOneMock,
      findMany: usersServiceFindManyMock,
    } as unknown as UsersService;

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
        usersServiceFindOneMockReturnValue.id,
        'id',
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
        usersServiceFindOneMockReturnValue.username,
        'username',
      );
      expect(usersEntity).toEqual(usersServiceFindOneMockReturnValue);
    });
  });

  describe('findMany', () => {
    let usersServiceFindManyMockReturnValue: FindManyResponse<UsersEntity>;
    let testUsersFindManyDto: UsersFindManyDto;

    it('Should call usersService.findMany with a UsersFindManyDto, and return the found users', async () => {
      usersServiceFindManyMockReturnValue = {
        entities: [getUsersEntityFixture(), getUsersEntityFixture()],
        total: 10,
      };
      usersServiceFindManyMock.mockReturnValue(
        usersServiceFindManyMockReturnValue,
      );

      testUsersFindManyDto = getUsersFindManyDtoFixture();
      const { entities, total } =
        await usersController.findMany(testUsersFindManyDto);

      usersEntities = entities;

      expect(usersServiceFindManyMock).toHaveBeenNthCalledWith(
        1,
        testUsersFindManyDto,
      );
      expect(usersEntities).toEqual(
        usersServiceFindManyMockReturnValue.entities,
      );
      expect(total).toBe(usersServiceFindManyMockReturnValue.total);
    });
  });
});
