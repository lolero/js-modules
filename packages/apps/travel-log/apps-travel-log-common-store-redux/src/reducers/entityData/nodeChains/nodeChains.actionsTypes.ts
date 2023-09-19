import {
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeChain, NodeChainsReducer } from './nodeChains.types';

export enum NodeChainsActionTypes {
  NODE_CHAINS__GET_MANY__REQUEST = 'NODE_CHAINS__GET_MANY__REQUEST',
  NODE_CHAINS__GET_MANY__SUCCESS = 'NODE_CHAINS__GET_MANY__SUCCESS',
  NODE_CHAINS__GET_MANY__FAIL = 'NODE_CHAINS__GET_MANY__FAIL',
}

export type NodeChainsGetManyRequestAction = RequestAction<
  NodeChainsActionTypes.NODE_CHAINS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata
>;

export type NodeChainsGetManySuccessAction = SaveWholeEntitiesAction<
  NodeChainsActionTypes.NODE_CHAINS__GET_MANY__SUCCESS,
  NodeChainsReducer['metadata'],
  NodeChain
>;

export type NodeChainsGetManyFailAction =
  FailAction<NodeChainsActionTypes.NODE_CHAINS__GET_MANY__FAIL>;

export type NodeChainsReducerHittingAction =
  | NodeChainsGetManyRequestAction
  | NodeChainsGetManySuccessAction
  | NodeChainsGetManyFailAction;
