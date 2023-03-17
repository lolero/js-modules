import { RequestsDtoQueryParamsFindMany } from '@js-modules/api-nest-utils';
import { ProductsEntity } from './products.entity';
import { ProductsDtoFindManyUniqueKeys } from './products.dto.findManyUniqueKeys';

export class ProductsDtoFindMany extends RequestsDtoQueryParamsFindMany<
  ProductsDtoFindManyUniqueKeys,
  (keyof ProductsEntity)[number]
> {}
