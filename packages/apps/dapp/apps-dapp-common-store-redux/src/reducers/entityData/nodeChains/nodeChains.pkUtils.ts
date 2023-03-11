import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeChain, nodeChainsPkSchema } from './nodeChains.types';

export const {
  getPkOfEntity: getPkOfNodeChain,
  destructPk: destructNodeChainPk,
} = createReducerPkUtils<NodeChain, typeof nodeChainsPkSchema>(
  nodeChainsPkSchema,
);
