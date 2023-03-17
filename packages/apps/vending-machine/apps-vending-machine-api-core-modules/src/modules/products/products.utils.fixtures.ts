import { ProductsEntity } from './products.entity';
import { ProductsEntityType } from './products.types';
import { getUsersEntityFixture } from '../users/users.utils.fixtures';

export function getProductsEntityFixture(
  overrides: Partial<ProductsEntityType> = {},
): ProductsEntity {
  const productsEntityDefault: ProductsEntityType = {
    id: 1,
    name: 'test_product_1',
    cost: 1,
    amountAvailable: 10,
    seller: getUsersEntityFixture(),
  };

  const productsEntity = Object.assign(productsEntityDefault, overrides);

  return productsEntity as ProductsEntity;
}
