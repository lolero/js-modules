import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeProduct, nodeProductsPkSchema } from './nodeProducts.types';

export const {
  getPkOfEntity: getPkOfNodeProduct,
  destructPk: destructNodeProductPk,
} = createReducerPkUtils<NodeProduct, typeof nodeProductsPkSchema>(
  nodeProductsPkSchema,
);
