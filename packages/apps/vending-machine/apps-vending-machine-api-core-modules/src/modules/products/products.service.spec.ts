import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsDtoCreateOne } from './products.dto.createOne';
import { UsersEntity } from '../users/users.entity';
import { getUsersEntityFixture } from '../users/users.utils.fixtures';
import { ProductsEntity } from './products.entity';
import { getProductsEntityFixture } from './products.utils.fixtures';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  const usersEntityCurrent = getUsersEntityFixture({ id: 100 });

  let productsRepositoryCreateMock: jest.Mock;
  let productsRepositorySaveMock: jest.Mock;
  let productsRepositoryMock: Partial<Repository<ProductsEntity>>;

  let usersRepositoryMock: Partial<Repository<UsersEntity>>;

  let productsService: ProductsService;

  beforeEach(async () => {
    productsRepositoryCreateMock = jest.fn();
    productsRepositorySaveMock = jest
      .fn()
      .mockImplementation((productsEntitiesToSave) => productsEntitiesToSave);
    productsRepositoryMock = {
      create: productsRepositoryCreateMock,
      save: productsRepositorySaveMock,
    };

    usersRepositoryMock = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
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

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('Should create an instance of ProductsService', () => {
    expect(productsService).toBeDefined();
  });

  describe('createOne', () => {
    let productsRepositoryCreateMockReturnValue: ProductsEntity;

    it('Should call usersRepository.create with the provided productsDtoCreateOne, with the current authenticated user as the seller, and return the created product', async () => {
      productsRepositoryCreateMockReturnValue = getProductsEntityFixture();
      productsRepositoryCreateMock.mockReturnValue(
        productsRepositoryCreateMockReturnValue,
      );

      const productsDtoCreateOne: ProductsDtoCreateOne = {
        name: 'test_product_name',
        cost: 100,
        amountAvailable: 100,
      };
      const productsEntity = await productsService.createOne(
        productsDtoCreateOne,
        usersEntityCurrent,
      );

      const newProductEntity = getProductsEntityFixture({
        ...productsRepositoryCreateMockReturnValue,
        seller: usersEntityCurrent,
      });
      expect(productsRepositoryCreateMock).toHaveBeenNthCalledWith(
        1,
        productsDtoCreateOne,
      );
      expect(productsRepositorySaveMock).toHaveBeenNthCalledWith(
        1,
        newProductEntity,
      );
      expect(productsEntity).toEqual(newProductEntity);
    });
  });
});
