import { v4 as uuidv4 } from 'uuid';
import {
  NodeFormsActionTypes,
  NodeFormsGetManyFailAction,
  NodeFormsGetManyRequestAction,
  NodeFormsGetManySuccessAction,
  NodeFormsGetOneFailAction,
  NodeFormsGetOneRequestAction,
  NodeFormsGetOneSuccessAction,
  NodeFormsUpdateOnePartialFailAction,
  NodeFormsUpdateOnePartialRequestAction,
  NodeFormsUpdateOnePartialSuccessAction,
} from './nodeForms.actionsTypes';

export function createNodeFormsUpdateOnePartialRequestAction(
  nodeFormPk: NodeFormsUpdateOnePartialRequestAction['requestMetadata']['nodeFormPk'],
  nodeFormPartial: NodeFormsUpdateOnePartialRequestAction['requestMetadata']['nodeFormPartial'],
): NodeFormsUpdateOnePartialRequestAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__REQUEST,
    requestMetadata: {
      nodeFormPk,
      nodeFormPartial,
    },
    requestId: uuidv4(),
  };
}

export function createNodeFormsUpdateOnePartialSuccessAction(
  nodeFormsPartial: NodeFormsUpdateOnePartialSuccessAction['partialEntities'],
  requestId: NodeFormsUpdateOnePartialSuccessAction['requestId'],
  statusCode?: NodeFormsUpdateOnePartialSuccessAction['statusCode'],
): NodeFormsUpdateOnePartialSuccessAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__SUCCESS,
    partialEntities: nodeFormsPartial,
    requestId,
    statusCode,
  };
}

export function createNodeFormsUpdateOnePartialFailAction(
  error: NodeFormsUpdateOnePartialFailAction['error'],
  requestId: NodeFormsUpdateOnePartialFailAction['requestId'],
): NodeFormsUpdateOnePartialFailAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__FAIL,
    error,
    requestId,
  };
}

export function createNodeFormsGetOneRequestAction(
  uniqueKeyValue: NodeFormsGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeFormsGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
): NodeFormsGetOneRequestAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__GET_ONE__REQUEST,
    requestMetadata: {
      uniqueKeyValue,
      uniqueKeyName,
    },
    requestId: uuidv4(),
  };
}

export function createNodeFormsGetOneSuccessAction(
  nodeForms: NodeFormsGetOneSuccessAction['wholeEntities'],
  requestId: NodeFormsGetOneSuccessAction['requestId'],
  statusCode?: NodeFormsGetOneSuccessAction['statusCode'],
): NodeFormsGetOneSuccessAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__GET_ONE__SUCCESS,
    wholeEntities: nodeForms,
    requestId,
    statusCode,
  };
}

export function createNodeFormsGetOneFailAction(
  error: NodeFormsGetOneFailAction['error'],
  requestId: NodeFormsGetOneFailAction['requestId'],
): NodeFormsGetOneFailAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__GET_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeFormsGetManyRequestAction(): NodeFormsGetManyRequestAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeFormsGetManySuccessAction(
  nodeForms: NodeFormsGetManySuccessAction['wholeEntities'],
  requestId: NodeFormsGetManySuccessAction['requestId'],
  statusCode: NodeFormsGetManySuccessAction['statusCode'],
  flush: NodeFormsGetManySuccessAction['flush'],
): NodeFormsGetManySuccessAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__GET_MANY__SUCCESS,
    wholeEntities: nodeForms,
    requestId,
    statusCode,
    flush,
  };
}

export function createNodeFormsGetManyFailAction(
  error: NodeFormsGetManyFailAction['error'],
  requestId: NodeFormsGetManyFailAction['requestId'],
): NodeFormsGetManyFailAction {
  return {
    type: NodeFormsActionTypes.NODE_FORMS__GET_MANY__FAIL,
    error,
    requestId,
  };
}
