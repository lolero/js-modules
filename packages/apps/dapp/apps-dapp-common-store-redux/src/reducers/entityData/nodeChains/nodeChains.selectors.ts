import { createReducerSelectors } from 'normalized-reducers-utils';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';
import { ReduxState } from '../../reducers.types';
import { nodeChainsReducerPath } from './nodeChains.reducerPath';

export const nodeChainsReducerSelectors = createReducerSelectors<
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
} = nodeChainsReducerSelectors;
