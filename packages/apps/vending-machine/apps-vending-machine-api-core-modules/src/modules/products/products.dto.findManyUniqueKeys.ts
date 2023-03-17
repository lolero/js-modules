import { IsInt, IsOptional } from 'class-validator';
import { ProductsEntity } from './products.entity';

export class ProductsDtoFindManyUniqueKeys {
  @IsInt({ each: true })
  @IsOptional()
  id?: ProductsEntity['id'][];
}
