import { Test, TestingModule } from '@nestjs/testing';
import { UsersEntity } from './users.entity';
import { ProductsEntity } from '../products/products.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getUsersEntityFixture } from './users.utils.fixtures';
import { PurchaseChange } from './users.types';

describe('UsersController', () => {
  const usersEntityCurrent = getUsersEntityFixture();
  let usersServiceDepositMock: jest.Mock;
  let usersServicePurchaseMock: jest.Mock;
  let usersServiceMock: Partial<UsersService>;
  let usersController: UsersController;

  beforeEach(async () => {
    usersServiceDepositMock = jest.fn();
    usersServicePurchaseMock = jest.fn();
    usersServiceMock = {
      deposit: usersServiceDepositMock,
      purchase: usersServicePurchaseMock,
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

  describe('deposit', () => {
    let usersServiceDepositMockReturnValue: {
      balance: UsersEntity['balance'];
    };

    it('Should call usersService.deposit with the provided amount and the current authenticated user, and return the users balance', async () => {
      usersServiceDepositMockReturnValue = {
        balance: 100,
      };
      usersServiceDepositMock.mockReturnValue(
        usersServiceDepositMockReturnValue,
      );

      const response = await usersController.deposit(
        {
          amount: 10,
        },
        usersEntityCurrent,
      );

      expect(usersServiceDepositMock).toHaveBeenNthCalledWith(
        1,
        10,
        usersEntityCurrent,
      );
      expect(response).toEqual(usersServiceDepositMockReturnValue);
    });
  });

  describe('purchase', () => {
    let usersServicePurchaseMockReturnValue: {
      products: ProductsEntity[];
      balance: number;
      change: PurchaseChange;
    };

    it('Should call usersService.purchase with the provided usersDtoPurchase and the current authenticated user, and return the updated products, the users balance, and their change', async () => {
      usersServicePurchaseMockReturnValue = {
        products: [],
        balance: 100,
        change: [5, 10, 20],
      };
      usersServicePurchaseMock.mockReturnValue(
        usersServicePurchaseMockReturnValue,
      );

      const usersDtoPurchase = {
        1: {
          productId: 1,
          quantity: 10,
        },
        2: {
          productId: 2,
          quantity: 20,
        },
      };

      const response = await usersController.purchase(
        usersDtoPurchase,
        usersEntityCurrent,
      );

      expect(usersServicePurchaseMock).toHaveBeenNthCalledWith(
        1,
        usersDtoPurchase,
        usersEntityCurrent,
      );
      expect(response).toEqual(usersServicePurchaseMockReturnValue);
    });
  });
});
