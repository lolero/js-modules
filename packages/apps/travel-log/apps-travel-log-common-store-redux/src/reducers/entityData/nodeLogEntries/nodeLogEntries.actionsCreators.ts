import { v4 as uuidv4 } from 'uuid';
import {
  NodeLogEntriesActionTypes,
  NodeLogEntriesCreateOneFailAction,
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesCreateOneSuccessAction,
  NodeLogEntriesGetManyFailAction,
  NodeLogEntriesGetManyRequestAction,
  NodeLogEntriesGetManySuccessAction,
  NodeLogEntriesGetOneFailAction,
  NodeLogEntriesGetOneRequestAction,
  NodeLogEntriesGetOneSuccessAction,
  NodeLogEntriesUpdateOnePartialFailAction,
  NodeLogEntriesUpdateOnePartialRequestAction,
  NodeLogEntriesUpdateOnePartialSuccessAction,
} from './nodeLogEntries.actionsTypes';

export function createNodeLogEntriesCreateOneRequestAction(
  nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['nodeLogEntry'],
): NodeLogEntriesCreateOneRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
    requestMetadata: {
      nodeLogEntry,
    },
    requestId: uuidv4(),
  };
}

export function createNodeLogEntriesCreateOneSuccessAction(
  nodeLogEntries: NodeLogEntriesCreateOneSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesCreateOneSuccessAction['requestId'],
  statusCode?: NodeLogEntriesCreateOneSuccessAction['statusCode'],
): NodeLogEntriesCreateOneSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS,
    wholeEntities: nodeLogEntries,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesCreateOneFailAction(
  error: NodeLogEntriesCreateOneFailAction['error'],
  requestId: NodeLogEntriesCreateOneFailAction['requestId'],
): NodeLogEntriesCreateOneFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeLogEntriesGetOneRequestAction(
  uniqueKeyValue: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
): NodeLogEntriesGetOneRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__REQUEST,
    requestMetadata: {
      uniqueKeyValue,
      uniqueKeyName,
    },
    requestId: uuidv4(),
  };
}

export function createNodeLogEntriesGetOneSuccessAction(
  nodeLogEntries: NodeLogEntriesGetOneSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesGetOneSuccessAction['requestId'],
  statusCode?: NodeLogEntriesGetOneSuccessAction['statusCode'],
): NodeLogEntriesGetOneSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__SUCCESS,
    wholeEntities: nodeLogEntries,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesGetOneFailAction(
  error: NodeLogEntriesGetOneFailAction['error'],
  requestId: NodeLogEntriesGetOneFailAction['requestId'],
): NodeLogEntriesGetOneFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeLogEntriesGetManyRequestAction(): NodeLogEntriesGetManyRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeLogEntriesGetManySuccessAction(
  nodeLogEntries: NodeLogEntriesGetManySuccessAction['wholeEntities'],
  requestId: NodeLogEntriesGetManySuccessAction['requestId'],
  statusCode: NodeLogEntriesGetManySuccessAction['statusCode'],
  flush: NodeLogEntriesGetManySuccessAction['flush'],
): NodeLogEntriesGetManySuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__SUCCESS,
    wholeEntities: nodeLogEntries,
    requestId,
    statusCode,
    flush,
  };
}

export function createNodeLogEntriesGetManyFailAction(
  error: NodeLogEntriesGetManyFailAction['error'],
  requestId: NodeLogEntriesGetManyFailAction['requestId'],
): NodeLogEntriesGetManyFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeLogEntriesUpdateOnePartialRequestAction(
  nodeLogEntryPk: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['nodeLogEntryPk'],
  nodeLogEntryPartial: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['nodeLogEntryPartial'],
): NodeLogEntriesUpdateOnePartialRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
    requestMetadata: {
      nodeLogEntryPk,
      nodeLogEntryPartial,
    },
    requestId: uuidv4(),
  };
}

export function createNodeLogEntriesUpdateOnePartialSuccessAction(
  nodeLogEntriesPartial: NodeLogEntriesUpdateOnePartialSuccessAction['partialEntities'],
  requestId: NodeLogEntriesUpdateOnePartialSuccessAction['requestId'],
  statusCode?: NodeLogEntriesUpdateOnePartialSuccessAction['statusCode'],
): NodeLogEntriesUpdateOnePartialSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS,
    partialEntities: nodeLogEntriesPartial,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesUpdateOnePartialFailAction(
  error: NodeLogEntriesUpdateOnePartialFailAction['error'],
  requestId: NodeLogEntriesUpdateOnePartialFailAction['requestId'],
): NodeLogEntriesUpdateOnePartialFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL,
    error,
    requestId,
  };
}
