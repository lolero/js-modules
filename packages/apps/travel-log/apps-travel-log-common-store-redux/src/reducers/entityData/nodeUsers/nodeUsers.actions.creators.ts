import { v4 as uuidv4 } from 'uuid';
import {
  NodeUsersActionTypes,
  NodeUsersGetManyFailAction,
  NodeUsersGetManyRequestAction,
  NodeUsersGetManySuccessAction,
  NodeUsersGetOneFailAction,
  NodeUsersGetOneRequestAction,
  NodeUsersGetOneSuccessAction,
  NodeUsersUpdateOnePartialSuccessAction,
} from './nodeUsers.actions.types';

export function createNodeUsersGetOneRequestAction(
  uniqueKeyValue: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  uniqueKeyName: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
): NodeUsersGetOneRequestAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__GET_ONE__REQUEST,
    requestMetadata: {
      uniqueKeyValue,
      uniqueKeyName,
    },
    requestId: uuidv4(),
  };
}

export function createNodeUsersGetOneSuccessAction(
  nodeUsers: NodeUsersGetOneSuccessAction['wholeEntities'],
  requestId: NodeUsersGetOneSuccessAction['requestId'],
  statusCode?: NodeUsersGetOneSuccessAction['statusCode'],
): NodeUsersGetOneSuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__GET_ONE__SUCCESS,
    wholeEntities: nodeUsers,
    requestId,
    statusCode,
  };
}

export function createNodeUsersGetOneFailAction(
  error: NodeUsersGetOneFailAction['error'],
  requestId: NodeUsersGetOneFailAction['requestId'],
): NodeUsersGetOneFailAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__GET_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeUsersGetManyRequestAction(): NodeUsersGetManyRequestAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeUsersGetManySuccessAction(
  nodeUsers: NodeUsersGetManySuccessAction['wholeEntities'],
  requestId: NodeUsersGetManySuccessAction['requestId'],
  statusCode: NodeUsersGetManySuccessAction['statusCode'],
  flush: NodeUsersGetManySuccessAction['flush'],
): NodeUsersGetManySuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__GET_MANY__SUCCESS,
    wholeEntities: nodeUsers,
    requestId,
    statusCode,
    flush,
  };
}

export function createNodeUsersGetManyFailAction(
  error: NodeUsersGetManyFailAction['error'],
  requestId: NodeUsersGetManyFailAction['requestId'],
): NodeUsersGetManyFailAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeUsersUpdateOnePartialSuccessAction(
  nodeUsersPartial: NodeUsersUpdateOnePartialSuccessAction['partialEntities'],
): NodeUsersUpdateOnePartialSuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS,
    partialEntities: nodeUsersPartial,
  };
}
