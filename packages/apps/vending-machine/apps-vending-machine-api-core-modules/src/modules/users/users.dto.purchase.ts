// eslint-disable-next-line max-classes-per-file
import { IsInt, ValidateNested } from 'class-validator';
import { ProductsEntity } from '../products/products.entity';

class DtoPurchase {
  @IsInt()
  productId: ProductsEntity['id'];

  @IsInt()
  quantity: number;
}

export class UsersDtoPurchase {
  @ValidateNested()
  purchases: Record<string, DtoPurchase>;
}
