import { Test, TestingModule } from '@nestjs/testing';
import { AuthUsersUniqueKeyName } from '@js-modules/apps-nest-module-auth';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

  describe('findOne', () => {
    it('Should find one user by id if uniqueKeyName is undefined', async () => {
      const testUniqueKeyValue = 'test_unique_key';
      await controller.findOne(testUniqueKeyValue);

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        'id',
        testUniqueKeyValue,
      );
    });

    it('Should find one user by uniqueKeyName when specified', async () => {
      const testUniqueKeyName: AuthUsersUniqueKeyName = 'username';
      const testUniqueKeyValue = 'test_unique_key';
      await controller.findOne(testUniqueKeyValue, testUniqueKeyName);

      expect(usersServiceFindOneMock).toHaveBeenNthCalledWith(
        1,
        testUniqueKeyName,
        testUniqueKeyValue,
      );
    });
  });
});
