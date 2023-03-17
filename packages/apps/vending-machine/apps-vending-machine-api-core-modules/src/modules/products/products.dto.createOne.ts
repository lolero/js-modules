import { IsInt, IsString } from 'class-validator';
import { ProductsEntity } from './products.entity';

export class ProductsDtoCreateOne {
  @IsString()
  name: ProductsEntity['name'];

  @IsInt()
  cost: ProductsEntity['cost'];

  @IsInt()
  amountAvailable: ProductsEntity['amountAvailable'];
}
