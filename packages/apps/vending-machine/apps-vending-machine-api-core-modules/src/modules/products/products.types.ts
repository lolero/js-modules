import { EntityUniqueKeyName } from '@js-modules/api-nest-utils';
import { ProductsEntity } from './products.entity';

export type ProductsUniqueKeyName = EntityUniqueKeyName<ProductsEntity, 'id'>;

export type ProductsEntityType = Omit<
  ProductsEntity,
  'logInsert' | 'logUpdate' | 'logRemove'
>;
