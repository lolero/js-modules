import { v4 as uuidv4 } from 'uuid';
import {
  NodeLogEntriesActionTypes,
  NodeLogEntriesCreateOneFailAction,
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesCreateOneSuccessAction,
  NodeLogEntriesDeleteManyFailAction,
  NodeLogEntriesDeleteManyRequestAction,
  NodeLogEntriesDeleteManySuccessAction,
  NodeLogEntriesDeleteOneFailAction,
  NodeLogEntriesDeleteOneRequestAction,
  NodeLogEntriesDeleteOneSuccessAction,
  NodeLogEntriesGetManyFailAction,
  NodeLogEntriesGetManyRequestAction,
  NodeLogEntriesGetManySuccessAction,
  NodeLogEntriesGetOneFailAction,
  NodeLogEntriesGetOneRequestAction,
  NodeLogEntriesGetOneSuccessAction,
  NodeLogEntriesUpdateManyPartialWithPatternFailAction,
  NodeLogEntriesUpdateManyPartialWithPatternRequestAction,
  NodeLogEntriesUpdateManyPartialWithPatternSuccessAction,
  NodeLogEntriesUpdateOnePartialFailAction,
  NodeLogEntriesUpdateOnePartialRequestAction,
  NodeLogEntriesUpdateOnePartialSuccessAction,
  NodeLogEntriesUpdateOneWholeFailAction,
  NodeLogEntriesUpdateOneWholeRequestAction,
  NodeLogEntriesUpdateOneWholeSuccessAction,
  NodeLogEntriesUpdatePartialReducerMetadataFailAction,
  NodeLogEntriesUpdatePartialReducerMetadataRequestAction,
  NodeLogEntriesUpdatePartialReducerMetadataSuccessAction,
} from './nodeLogEntries.actions.types';

export function createNodeLogEntriesUpdatePartialReducerMetadataRequestAction(
  partialReducerMetadata: NodeLogEntriesUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
): NodeLogEntriesUpdatePartialReducerMetadataRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    requestMetadata: {
      partialReducerMetadata,
    },
    requestId: uuidv4(),
  };
}

export function createNodeLogEntriesUpdatePartialReducerMetadataSuccessAction(
  partialReducerMetadata: NodeLogEntriesUpdatePartialReducerMetadataSuccessAction['partialReducerMetadata'],
  requestId: NodeLogEntriesUpdatePartialReducerMetadataSuccessAction['requestId'],
): NodeLogEntriesUpdatePartialReducerMetadataSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    partialReducerMetadata,
    requestId,
  };
}

export function createNodeLogEntriesUpdatePartialReducerMetadataFailAction(
  error: NodeLogEntriesUpdatePartialReducerMetadataFailAction['error'],
  requestId: NodeLogEntriesUpdatePartialReducerMetadataFailAction['requestId'],
): NodeLogEntriesUpdatePartialReducerMetadataFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL,
    error,
    requestId,
  };
}

export const NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID =
  'NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID';
export function createNodeLogEntriesCreateOneRequestAction(
  entity: NodeLogEntriesCreateOneRequestAction['requestMetadata']['entity'],
): NodeLogEntriesCreateOneRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
    requestMetadata: {
      entity,
    },
    requestId: NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  };
}

export function createNodeLogEntriesCreateOneSuccessAction(
  wholeEntities: NodeLogEntriesCreateOneSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesCreateOneSuccessAction['requestId'],
  statusCode?: NodeLogEntriesCreateOneSuccessAction['statusCode'],
): NodeLogEntriesCreateOneSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS,
    wholeEntities,
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
  uniqueKeyName: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyName'],
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
  wholeEntities: NodeLogEntriesGetOneSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesGetOneSuccessAction['requestId'],
  statusCode?: NodeLogEntriesGetOneSuccessAction['statusCode'],
): NodeLogEntriesGetOneSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__SUCCESS,
    wholeEntities,
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

export function createNodeLogEntriesGetManyRequestAction(
  findManyDto?: NodeLogEntriesGetManyRequestAction['requestMetadata']['findManyDto'],
): NodeLogEntriesGetManyRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST,
    requestMetadata: {
      findManyDto,
    },
    requestId: uuidv4(),
  };
}

export function createNodeLogEntriesGetManySuccessAction(
  wholeEntities: NodeLogEntriesGetManySuccessAction['wholeEntities'],
  requestId: NodeLogEntriesGetManySuccessAction['requestId'],
  statusCode: NodeLogEntriesGetManySuccessAction['statusCode'],
  flush: NodeLogEntriesGetManySuccessAction['flush'],
): NodeLogEntriesGetManySuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__SUCCESS,
    wholeEntities,
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

export const NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID =
  'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID';
export function createNodeLogEntriesUpdateOneWholeRequestAction(
  entity: NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata']['entity'],
): NodeLogEntriesUpdateOneWholeRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST,
    requestMetadata: {
      entity,
    },
    requestId: NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
  };
}

export function createNodeLogEntriesUpdateOneWholeSuccessAction(
  wholeEntities: NodeLogEntriesUpdateOneWholeSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesUpdateOneWholeSuccessAction['requestId'],
  statusCode?: NodeLogEntriesUpdateOneWholeSuccessAction['statusCode'],
): NodeLogEntriesUpdateOneWholeSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS,
    wholeEntities,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesUpdateOneWholeFailAction(
  error: NodeLogEntriesUpdateOneWholeFailAction['error'],
  requestId: NodeLogEntriesUpdateOneWholeFailAction['requestId'],
): NodeLogEntriesUpdateOneWholeFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL,
    error,
    requestId,
  };
}

export const NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID =
  'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID';
export function createNodeLogEntriesUpdateOnePartialRequestAction(
  entityPk: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['entityPk'],
  partialEntity: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['partialEntity'],
): NodeLogEntriesUpdateOnePartialRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
    requestMetadata: {
      entityPk,
      partialEntity,
    },
    requestId: NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
  };
}

export function createNodeLogEntriesUpdateOnePartialSuccessAction(
  wholeEntities: NodeLogEntriesUpdateOnePartialSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesUpdateOnePartialSuccessAction['requestId'],
  statusCode?: NodeLogEntriesUpdateOnePartialSuccessAction['statusCode'],
): NodeLogEntriesUpdateOnePartialSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS,
    wholeEntities,
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

export const NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID =
  'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID';
export function createNodeLogEntriesUpdateManyPartialWithPatternRequestAction(
  entityPks: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['entityPks'],
  partialEntity: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['partialEntity'],
): NodeLogEntriesUpdateManyPartialWithPatternRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST,
    requestMetadata: {
      entityPks,
      partialEntity,
    },
    requestId: NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
  };
}

export function createNodeLogEntriesUpdateManyPartialWithPatternSuccessAction(
  wholeEntities: NodeLogEntriesUpdateManyPartialWithPatternSuccessAction['wholeEntities'],
  requestId: NodeLogEntriesUpdateManyPartialWithPatternSuccessAction['requestId'],
  statusCode?: NodeLogEntriesUpdateManyPartialWithPatternSuccessAction['statusCode'],
): NodeLogEntriesUpdateManyPartialWithPatternSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS,
    wholeEntities,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesUpdateManyPartialWithPatternFailAction(
  error: NodeLogEntriesUpdateManyPartialWithPatternFailAction['error'],
  requestId: NodeLogEntriesUpdateManyPartialWithPatternFailAction['requestId'],
): NodeLogEntriesUpdateManyPartialWithPatternFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL,
    error,
    requestId,
  };
}

export const NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID =
  'NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID';
export function createNodeLogEntriesDeleteOneRequestAction(
  entityPk: NodeLogEntriesDeleteOneRequestAction['requestMetadata']['entityPk'],
): NodeLogEntriesDeleteOneRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__REQUEST,
    requestMetadata: {
      entityPk,
    },
    requestId: NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
  };
}

export function createNodeLogEntriesDeleteOneSuccessAction(
  entityPks: NodeLogEntriesDeleteOneSuccessAction['entityPks'],
  requestId: NodeLogEntriesDeleteOneSuccessAction['requestId'],
  statusCode?: NodeLogEntriesDeleteOneSuccessAction['statusCode'],
): NodeLogEntriesDeleteOneSuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS,
    entityPks,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesDeleteOneFailAction(
  error: NodeLogEntriesDeleteOneFailAction['error'],
  requestId: NodeLogEntriesDeleteOneFailAction['requestId'],
): NodeLogEntriesDeleteOneFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__FAIL,
    error,
    requestId,
  };
}

export const NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID =
  'NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID';
export function createNodeLogEntriesDeleteManyRequestAction(
  entityPks: NodeLogEntriesDeleteManyRequestAction['requestMetadata']['entityPks'],
): NodeLogEntriesDeleteManyRequestAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__REQUEST,
    requestMetadata: {
      entityPks,
    },
    requestId: NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  };
}

export function createNodeLogEntriesDeleteManySuccessAction(
  entityPks: NodeLogEntriesDeleteManySuccessAction['entityPks'],
  requestId: NodeLogEntriesDeleteManySuccessAction['requestId'],
  statusCode?: NodeLogEntriesDeleteManySuccessAction['statusCode'],
): NodeLogEntriesDeleteManySuccessAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS,
    entityPks,
    requestId,
    statusCode,
  };
}

export function createNodeLogEntriesDeleteManyFailAction(
  error: NodeLogEntriesDeleteManyFailAction['error'],
  requestId: NodeLogEntriesDeleteManyFailAction['requestId'],
): NodeLogEntriesDeleteManyFailAction {
  return {
    type: NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__FAIL,
    error,
    requestId,
  };
}
