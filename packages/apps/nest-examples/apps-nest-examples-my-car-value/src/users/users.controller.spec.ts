import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersUniqueKeyName } from '../api-nest-utils/src';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceFindOneMock: jest.Mock;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    usersServiceFindOneMock = jest.fn();
    usersServiceMock = {
      findOne: usersServiceFindOneMock,
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

    controller = module.get<UsersController>(UsersController);
  });

  it('Should create an instance of UsersController', () => {
    expect(controller).toBeDefined();
  });

  describe('usersFindOne', () => {
    it('Should find one user by id if uniqueKeyName is undefined', async () => {
      const testUniqueKeyValue = 'test_unique_key';
      await controller.usersFindOne(testUniqueKeyValue);

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'id',
        testUniqueKeyValue,
      );
    });

    it('Should find one user by uniqueKeyName when specified', async () => {
      const testUniqueKeyName: UsersUniqueKeyName = 'username';
      const testUniqueKeyValue = 'test_unique_key';
      await controller.usersFindOne(testUniqueKeyValue, testUniqueKeyName);

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        testUniqueKeyName,
        testUniqueKeyValue,
      );
    });
  });
});
