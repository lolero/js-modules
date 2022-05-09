import { createReducerPkUtils } from 'normalized-reducers-utils';
import { NodeSegway, nodeSegwaysPkSchema } from './nodeSegways.types';

export const {
  getPkOfEntity: getPkOfNodeSegway,
  destructPk: destructNodeSegwayPk,
} = createReducerPkUtils<NodeSegway, typeof nodeSegwaysPkSchema>(
  nodeSegwaysPkSchema,
);
