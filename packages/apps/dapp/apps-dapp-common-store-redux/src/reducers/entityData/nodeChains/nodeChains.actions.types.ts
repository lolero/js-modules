import type {
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type { NodeChain, NodeChainsReducer } from './nodeChains.types';

export const NodeChainsActionTypes = {
  NODE_CHAINS__GET_MANY__REQUEST: 'NODE_CHAINS__GET_MANY__REQUEST',
  NODE_CHAINS__GET_MANY__SUCCESS: 'NODE_CHAINS__GET_MANY__SUCCESS',
  NODE_CHAINS__GET_MANY__FAIL: 'NODE_CHAINS__GET_MANY__FAIL',
} as const;
export type NodeChainsActionTypes = Enum<typeof NodeChainsActionTypes>;

export type NodeChainsGetManyRequestAction = RequestAction<
  typeof NodeChainsActionTypes.NODE_CHAINS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata<NodeChain, never>
>;

export type NodeChainsGetManySuccessAction = SaveWholeEntitiesAction<
  typeof NodeChainsActionTypes.NODE_CHAINS__GET_MANY__SUCCESS,
  NodeChainsReducer['metadata'],
  NodeChain
>;

export type NodeChainsGetManyFailAction = FailAction<
  typeof NodeChainsActionTypes.NODE_CHAINS__GET_MANY__FAIL
>;

export type NodeChainsReducerHittingAction =
  | NodeChainsGetManyRequestAction
  | NodeChainsGetManySuccessAction
  | NodeChainsGetManyFailAction;
