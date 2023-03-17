import { Test, TestingModule } from '@nestjs/testing';
import { ProductsEntity } from './products.entity';
import { ProductsDtoCreateOne } from './products.dto.createOne';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { getUsersEntityFixture } from '../users/users.utils.fixtures';
import { getProductsEntityFixture } from './products.utils.fixtures';

describe('ProductsController', () => {
  const usersEntityCurrent = getUsersEntityFixture();
  let productsServiceCreateOneMock: jest.Mock;
  let productsServiceMock: Partial<ProductsService>;
  let productsController: ProductsController;

  beforeEach(async () => {
    productsServiceCreateOneMock = jest.fn();
    productsServiceMock = {
      createOne: productsServiceCreateOneMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceMock,
        },
      ],
      controllers: [ProductsController],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it('Should create an instance of ProductsController', () => {
    expect(productsController).toBeDefined();
  });

  describe('createOne', () => {
    let productsServiceCreateOneMockReturnValue: ProductsEntity;

    it('Should call productsService.createOne with the provided productsDtoCreateOne and the current authenticated product, and return the created product', async () => {
      productsServiceCreateOneMockReturnValue = getProductsEntityFixture();
      productsServiceCreateOneMock.mockReturnValue(
        productsServiceCreateOneMockReturnValue,
      );

      const productsDtoCreateOne: ProductsDtoCreateOne = {
        name: 'test_product_name',
        cost: 100,
        amountAvailable: 100,
      };
      const productsEntity = await productsController.createOne(
        productsDtoCreateOne,
        usersEntityCurrent,
      );

      expect(productsServiceCreateOneMock).toHaveBeenNthCalledWith(
        1,
        productsDtoCreateOne,
        usersEntityCurrent,
      );
      expect(productsEntity).toEqual(productsServiceCreateOneMockReturnValue);
    });
  });
});
