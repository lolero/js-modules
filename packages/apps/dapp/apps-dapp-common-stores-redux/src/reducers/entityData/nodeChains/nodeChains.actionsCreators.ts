import { v4 as uuidv4 } from 'uuid';
import {
  NodeChainsActionTypes,
  NodeChainsGetManyFailAction,
  NodeChainsGetManyRequestAction,
  NodeChainsGetManySuccessAction,
} from './nodeChains.actionsTypes';

export function createNodeChainsGetManyRequestAction(): NodeChainsGetManyRequestAction {
  return {
    type: NodeChainsActionTypes.NODE_CHAINS_GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeChainsGetManySuccessAction(
  nodeChains: NodeChainsGetManySuccessAction['wholeEntities'],
  requestId: NodeChainsGetManySuccessAction['requestId'],
  statusCode: NodeChainsGetManySuccessAction['statusCode'],
  flush: NodeChainsGetManySuccessAction['flush'],
): NodeChainsGetManySuccessAction {
  return {
    type: NodeChainsActionTypes.NODE_CHAINS_GET_MANY__SUCCESS,
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
    type: NodeChainsActionTypes.NODE_CHAINS_GET_MANY__FAIL,
    error,
    requestId,
  };
}
