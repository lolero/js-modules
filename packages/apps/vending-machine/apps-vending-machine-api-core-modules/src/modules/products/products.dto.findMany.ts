import { DtoFindMany } from '@js-modules/api-nest-utils';
import { ProductsEntity } from './products.entity';

export class ProductsDtoFindMany extends DtoFindMany<ProductsEntity> {}
