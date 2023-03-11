import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeSegway, nodeSegwaysPkSchema } from './nodeSegways.types';

export const {
  getPkOfEntity: getPkOfNodeSegway,
  destructPk: destructNodeSegwayPk,
} = createReducerPkUtils<NodeSegway, typeof nodeSegwaysPkSchema>(
  nodeSegwaysPkSchema,
);
