import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { nodeChainsReducerPath } from './nodeChains.reducerPath';
import type { NodeChain, NodeChainsReducer } from './nodeChains.types';

export const nodeChainsSelectors = createReducerSelectors<
  NodeChainsReducer['metadata'],
  NodeChain,
  typeof nodeChainsReducerPath,
  ReduxState
>(nodeChainsReducerPath);

export const {
  // selectRequests: selectNodeChainsRequests,
  // selectMetadata: selectNodeChainsMetadata,
  // selectData: selectNodeChainsData,
  // selectConfig: selectNodeChainsConfig,
} = nodeChainsSelectors;
