import { v4 as uuidv4 } from 'uuid';
import {
  NodeTransactionsActionTypes,
  NodeTransactionsGetManyFailAction,
  NodeTransactionsGetManyRequestAction,
  NodeTransactionsGetManySuccessAction,
  NodeTransactionsGetOneFailAction,
  NodeTransactionsGetOneRequestAction,
  NodeTransactionsGetOneSuccessAction,
} from './nodeTransactions.actionsTypes';

export function createNodeTransactionsGetManyRequestAction(): NodeTransactionsGetManyRequestAction {
  return {
    type: NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeTransactionsGetManySuccessAction(
  nodeTransactions: NodeTransactionsGetManySuccessAction['wholeEntities'],
  requestId: NodeTransactionsGetManySuccessAction['requestId'],
  statusCode: NodeTransactionsGetManySuccessAction['statusCode'],
  flush: NodeTransactionsGetManySuccessAction['flush'],
): NodeTransactionsGetManySuccessAction {
  return {
    type: NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_MANY__SUCCESS,
    wholeEntities: nodeTransactions,
    requestId,
    statusCode,
    flush,
  };
}

export function createNodeTransactionsGetManyFailAction(
  error: NodeTransactionsGetManyFailAction['error'],
  requestId: NodeTransactionsGetManyFailAction['requestId'],
): NodeTransactionsGetManyFailAction {
  return {
    type: NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeTransactionsGetOneRequestAction(
  nodeTransactionPk: NodeTransactionsGetOneRequestAction['requestMetadata']['entityPk'],
): NodeTransactionsGetOneRequestAction {
  return {
    type: NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_ONE__REQUEST,
    requestMetadata: {
      entityPk: nodeTransactionPk,
    },
    requestId: uuidv4(),
  };
}

export function createNodeTransactionsGetOneSuccessAction(
  nodeTransactions: NodeTransactionsGetOneSuccessAction['wholeEntities'],
  requestId: NodeTransactionsGetOneSuccessAction['requestId'],
  statusCode: NodeTransactionsGetOneSuccessAction['statusCode'],
): NodeTransactionsGetOneSuccessAction {
  return {
    type: NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_ONE__SUCCESS,
    wholeEntities: nodeTransactions,
    requestId,
    statusCode,
  };
}

export function createNodeTransactionsGetOneFailAction(
  error: NodeTransactionsGetOneFailAction['error'],
  requestId: NodeTransactionsGetOneFailAction['requestId'],
): NodeTransactionsGetOneFailAction {
  return {
    type: NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_ONE__FAIL,
    error,
    requestId,
  };
}
