import { Expose, Transform } from 'class-transformer';
import { ProductsEntity } from './products.entity';
import { UsersEntity } from '../users/users.entity';

export class ProductsDtoPublic {
  @Expose()
  id: ProductsEntity['id'];

  @Expose()
  name: ProductsEntity['name'];

  @Expose()
  cost: ProductsEntity['cost'];

  @Expose()
  amountAvailable: ProductsEntity['amountAvailable'];

  @Transform(({ obj }: { obj: ProductsEntity }) => {
    return obj.seller.id;
  })
  @Expose()
  sellerId: UsersEntity['id'];
}
