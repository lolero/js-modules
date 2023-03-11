import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';

const nodeChainsReducerMetadataInitialState: NodeChainsReducer['metadata'] = {};

const nodeChainsReducerDataInitialState: NodeChainsReducer['data'] = {};

export const nodeChainsInitialState = createInitialState<
  NodeChainsReducer['metadata'],
  NodeChain
>(nodeChainsReducerMetadataInitialState, nodeChainsReducerDataInitialState);
