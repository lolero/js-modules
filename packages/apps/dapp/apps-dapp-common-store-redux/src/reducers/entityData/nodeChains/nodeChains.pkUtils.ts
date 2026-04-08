import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import type { NodeChain } from './nodeChains.types';
import { nodeChainsPkSchema } from './nodeChains.types';

export const {
  getPkOfEntity: getPkOfNodeChain,
  destructPk: destructNodeChainPk,
} = createReducerPkUtils<NodeChain, typeof nodeChainsPkSchema>(
  nodeChainsPkSchema,
);
