import { createReducerPkUtils } from 'normalized-reducers-utils';
import { NodeChain, nodeChainsPkSchema } from './nodeChains.types';

export const {
  getPkOfEntity: getPkOfNodeChain,
  destructPk: destructNodeChainPk,
} = createReducerPkUtils<NodeChain, typeof nodeChainsPkSchema>(
  nodeChainsPkSchema,
);
