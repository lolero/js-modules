import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';
import { ReduxState } from '../../reducers.types';
import { nodeChainsReducerPath } from './nodeChains.reducerPath';

export const nodeChainsSelectors = createReducerSelectors<
  NodeChainsReducer['metadata'],
  NodeChain,
  typeof nodeChainsReducerPath,
  ReduxState
>(nodeChainsReducerPath);

export const {
  selectRequests: selectNodeChainsRequests,
  selectMetadata: selectNodeChainsMetadata,
  selectData: selectNodeChainsData,
  selectConfig: selectNodeChainsConfig,
} = nodeChainsSelectors;
