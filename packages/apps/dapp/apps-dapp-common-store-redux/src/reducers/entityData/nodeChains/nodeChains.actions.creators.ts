import {
  NodeChainsActionTypes,
  NodeChainsGetManyFailAction,
  NodeChainsGetManyRequestAction,
  NodeChainsGetManySuccessAction,
} from './nodeChains.actions.types';

export const NODE_CHAINS__GET_MANY__REQUEST_ID =
  'NODE_CHAINS__GET_MANY__REQUEST_ID';
export function createNodeChainsGetManyRequestAction(): NodeChainsGetManyRequestAction {
  return {
    type: NodeChainsActionTypes.NODE_CHAINS__GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: NODE_CHAINS__GET_MANY__REQUEST_ID,
  };
}

export function createNodeChainsGetManySuccessAction(
  nodeChains: NodeChainsGetManySuccessAction['wholeEntities'],
  requestId: NodeChainsGetManySuccessAction['requestId'],
  statusCode: NodeChainsGetManySuccessAction['statusCode'],
  flush: NodeChainsGetManySuccessAction['flush'],
): NodeChainsGetManySuccessAction {
  return {
    type: NodeChainsActionTypes.NODE_CHAINS__GET_MANY__SUCCESS,
    wholeEntities: nodeChains,
    requestId,
    statusCode,
    flush,
  };
}

export function createNodeChainsGetManyFailAction(
  error: NodeChainsGetManyFailAction['error'],
  requestId: NodeChainsGetManyFailAction['requestId'],
): NodeChainsGetManyFailAction {
  return {
    type: NodeChainsActionTypes.NODE_CHAINS__GET_MANY__FAIL,
    error,
    requestId,
  };
}
