import { Test, TestingModule } from '@nestjs/testing';
import { In, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import keys from 'lodash/keys';
import uniq from 'lodash/uniq';
import { UsersDtoPurchase } from './users.dto.purchase';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { getUsersEntityFixture } from './users.utils.fixtures';
import { usersUtilGetChange } from './users.util.getChange';
import { ProductsEntity } from '../products/products.entity';
import { getProductsEntityFixture } from '../products/products.utils.fixtures';
import { PurchaseChange } from './users.types';

jest.mock('./users.util.getChange');

describe('UsersService', () => {
  let usersEntityCurrent: UsersEntity;

  const usersUtilGetChangeMock = jest.mocked(usersUtilGetChange);

  let productsRepositoryFindByMock: jest.Mock;
  let productsRepositorySaveMock: jest.Mock;
  let productsRepositoryMock: Partial<Repository<ProductsEntity>>;

  let usersRepositoryFindByMock: jest.Mock;
  let usersRepositorySaveMock: jest.Mock;
  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let usersService: UsersService;

  beforeEach(async () => {
    productsRepositoryFindByMock = jest.fn();
    productsRepositorySaveMock = jest
      .fn()
      .mockImplementation((productsEntitiesToSave) => productsEntitiesToSave);
    productsRepositoryMock = {
      findBy: productsRepositoryFindByMock,
      save: productsRepositorySaveMock,
    };

    usersRepositoryFindByMock = jest.fn();
    usersRepositorySaveMock = jest
      .fn()
      .mockImplementation((usersEntitiesToSave) => usersEntitiesToSave);
    usersRepositoryMock = {
      findBy: usersRepositoryFindByMock,
      save: usersRepositorySaveMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(ProductsEntity),
          useFactory: () => productsRepositoryMock,
        },
        {
          provide: getRepositoryToken(UsersEntity),
          useFactory: () => usersRepositoryMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    usersUtilGetChangeMock.mockRestore();
  });

  it('Should create an instance of UsersService', () => {
    expect(usersService).toBeDefined();
  });

  describe('deposit', () => {
    it('Should call usersRepository.save, with the users balance increased by the provided amount and return the updated balance', async () => {
      usersEntityCurrent = getUsersEntityFixture({ balance: 100 });

      const response = await usersService.deposit(10, usersEntityCurrent);

      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        getUsersEntityFixture({ balance: 110 }),
      );
      expect(response).toEqual({ balance: 110 });
    });
  });

  describe('purchase', () => {
    let productsRepositoryFindByMockReturnValue: ProductsEntity[];
    let usersRepositoryFindByMockReturnValue: UsersEntity[];
    let usersUtilGetChangeMockReturnValue: PurchaseChange;

    it('Should find the purchased products, find their sellers, empty the buyers balance, call usersUtilGetChange, update the sellers balances, update the purchased products available amounts, and return the purchased products, the users balance, and their change', async () => {
      usersEntityCurrent = getUsersEntityFixture({ id: 100, balance: 100 });

      productsRepositoryFindByMockReturnValue = [
        getProductsEntityFixture({
          id: 1,
          cost: 1,
          amountAvailable: 10,
          seller: getUsersEntityFixture({
            id: 1,
            balance: 100,
          }),
        }),
        getProductsEntityFixture({
          id: 2,
          cost: 2,
          amountAvailable: 20,
          seller: getUsersEntityFixture({
            id: 2,
            balance: 200,
          }),
        }),
      ];
      productsRepositoryFindByMock.mockReturnValue(
        productsRepositoryFindByMockReturnValue,
      );

      usersRepositoryFindByMockReturnValue = [
        productsRepositoryFindByMockReturnValue[0].seller,
        productsRepositoryFindByMockReturnValue[1].seller,
      ];
      usersRepositoryFindByMock.mockReturnValue(
        usersRepositoryFindByMockReturnValue,
      );

      usersUtilGetChangeMockReturnValue = [5, 5, 10, 10];
      usersUtilGetChangeMock.mockReturnValue(usersUtilGetChangeMockReturnValue);

      const usersDtoPurchase: UsersDtoPurchase = {
        purchases: {
          [productsRepositoryFindByMockReturnValue[0].id]: {
            productId: productsRepositoryFindByMockReturnValue[0].id,
            quantity: 1,
          },
          [productsRepositoryFindByMockReturnValue[1].id]: {
            productId: productsRepositoryFindByMockReturnValue[1].id,
            quantity: 2,
          },
        },
      };
      const response = await usersService.purchase(
        usersDtoPurchase,
        usersEntityCurrent,
      );

      const productsEntitiesResult = [
        getProductsEntityFixture({
          ...productsRepositoryFindByMockReturnValue[0],
          amountAvailable: 9,
          seller: getUsersEntityFixture({
            ...productsRepositoryFindByMockReturnValue[0].seller,
            balance: 101,
          }),
        }),
        getProductsEntityFixture({
          ...productsRepositoryFindByMockReturnValue[1],
          amountAvailable: 18,
          seller: getUsersEntityFixture({
            ...productsRepositoryFindByMockReturnValue[1].seller,
            balance: 204,
          }),
        }),
      ];
      expect(productsRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(keys(usersDtoPurchase.purchases)),
      });
      expect(usersUtilGetChangeMock).toHaveBeenNthCalledWith(1, 95);
      expect(usersRepositoryFindByMock).toHaveBeenNthCalledWith(1, {
        id: In(
          uniq(
            productsRepositoryFindByMockReturnValue.map(
              (productsEntity) => productsEntity.seller.id,
            ),
          ),
        ),
      });
      expect(productsRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        productsEntitiesResult,
      );
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(1, [
        getUsersEntityFixture({
          ...productsRepositoryFindByMockReturnValue[0].seller,
          balance: 101,
        }),
        getUsersEntityFixture({
          ...productsRepositoryFindByMockReturnValue[1].seller,
          balance: 204,
        }),
      ]);
      expect(usersRepositorySaveMock).toHaveBeenNthCalledWith(
        2,
        getUsersEntityFixture({ id: 100, balance: 0 }),
      );
      expect(response).toEqual({
        products: productsEntitiesResult,
        balance: 0,
        change: usersUtilGetChangeMockReturnValue,
      });
    });
  });
});
