import { IsInt } from 'class-validator';
import { ProductsEntity } from './products.entity';
import { ProductsDtoCreateOne } from './products.dto.createOne';

export class ProductsDtoUpdateOneWhole extends ProductsDtoCreateOne {
  @IsInt()
  id: ProductsEntity['id'];
}
