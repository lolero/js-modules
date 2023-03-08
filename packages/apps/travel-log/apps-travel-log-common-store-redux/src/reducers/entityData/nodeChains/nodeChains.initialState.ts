import { createInitialState } from 'normalized-reducers-utils';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';

const nodeChainsReducerMetadataInitialState: NodeChainsReducer['metadata'] = {};

const nodeChainsReducerDataInitialState: NodeChainsReducer['data'] = {};

export const nodeChainsInitialState = createInitialState<
  NodeChainsReducer['metadata'],
  NodeChain
>(nodeChainsReducerMetadataInitialState, nodeChainsReducerDataInitialState);
