import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';
import { NODE_CHAINS__GET_MANY__REQUEST_ID } from './nodeChains.actions.creators';

const nodeChainsReducerMetadataInitialState: NodeChainsReducer['metadata'] = {};

const nodeChainsReducerDataInitialState: NodeChainsReducer['data'] = {};

export const nodeChainsInitialState = createInitialState<
  NodeChainsReducer['metadata'],
  NodeChain
>(nodeChainsReducerMetadataInitialState, nodeChainsReducerDataInitialState, {
  protectedRequestIds: [NODE_CHAINS__GET_MANY__REQUEST_ID],
});
