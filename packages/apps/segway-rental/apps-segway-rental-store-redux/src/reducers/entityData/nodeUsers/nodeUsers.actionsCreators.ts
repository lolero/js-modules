import { v4 as uuidv4 } from 'uuid';
import {
  NodeUsersActionTypes,
  NodeUsersDeleteOneFailAction,
  NodeUsersDeleteOneRequestAction,
  NodeUsersDeleteOneSuccessAction,
  NodeUsersGetManyFailAction,
  NodeUsersGetManyRequestAction,
  NodeUsersGetManySuccessAction,
  NodeUsersGetOneFailAction,
  NodeUsersGetOneRequestAction,
  NodeUsersGetOneSuccessAction,
  NodeUsersUpdateOneRoleFailAction,
  NodeUsersUpdateOneRoleRequestAction,
  NodeUsersUpdateOneRoleSuccessAction,
} from './nodeUsers.actionsTypes';

export function createNodeUsersGetManyRequestAction(): NodeUsersGetManyRequestAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeUsersGetManySuccessAction(
  nodeUsers: NodeUsersGetManySuccessAction['wholeEntities'],
  flush: boolean,
): NodeUsersGetManySuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_GET_MANY__SUCCESS,
    wholeEntities: nodeUsers,
    flush,
  };
}

export function createNodeUsersGetManyFailAction(
  error: NodeUsersGetManyFailAction['error'],
  requestId: NodeUsersGetManyFailAction['requestId'],
): NodeUsersGetManyFailAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeUsersGetOneRequestAction(
  nodeUserPk: NodeUsersGetOneRequestAction['requestMetadata']['entityPk'],
): NodeUsersGetOneRequestAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_GET_ONE__REQUEST,
    requestMetadata: {
      entityPk: nodeUserPk,
    },
    requestId: uuidv4(),
  };
}

export function createNodeUsersGetOneSuccessAction(
  nodeUsers: NodeUsersGetOneSuccessAction['wholeEntities'],
  requestId: NodeUsersGetOneSuccessAction['requestId'],
  statusCode: NodeUsersGetOneSuccessAction['statusCode'],
): NodeUsersGetOneSuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_GET_ONE__SUCCESS,
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
    type: NodeUsersActionTypes.NODE_USERS_GET_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeUsersUpdateOneRoleRequestAction(
  nodeUserPk: NodeUsersUpdateOneRoleRequestAction['requestMetadata']['nodeUserPk'],
  role: NodeUsersUpdateOneRoleRequestAction['requestMetadata']['role'],
): NodeUsersUpdateOneRoleRequestAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__REQUEST,
    requestMetadata: {
      nodeUserPk,
      role,
    },
    requestId: uuidv4(),
  };
}

export function createNodeUsersUpdateOneRoleSuccessAction(
  nodeUsersPartial: NodeUsersUpdateOneRoleSuccessAction['partialEntities'],
  requestId: NodeUsersUpdateOneRoleSuccessAction['requestId'],
  statusCode: NodeUsersUpdateOneRoleSuccessAction['statusCode'],
): NodeUsersUpdateOneRoleSuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__SUCCESS,
    partialEntities: nodeUsersPartial,
    requestId,
    statusCode,
  };
}

export function createNodeUsersUpdateOneRoleFailAction(
  error: NodeUsersUpdateOneRoleFailAction['error'],
  requestId: NodeUsersUpdateOneRoleFailAction['requestId'],
): NodeUsersUpdateOneRoleFailAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__FAIL,
    error,
    requestId,
  };
}

export function createNodeUsersDeleteOneRequestAction(
  nodeUserPk: NodeUsersDeleteOneRequestAction['requestMetadata']['entityPk'],
): NodeUsersDeleteOneRequestAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_DELETE_ONE__REQUEST,
    requestMetadata: {
      entityPk: nodeUserPk,
    },
    requestId: uuidv4(),
  };
}

export function createNodeUsersDeleteOneSuccessAction(
  nodeUserPks: NodeUsersDeleteOneSuccessAction['entityPks'],
  requestId: NodeUsersDeleteOneSuccessAction['requestId'],
  statusCode: NodeUsersDeleteOneSuccessAction['statusCode'],
): NodeUsersDeleteOneSuccessAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_DELETE_ONE__SUCCESS,
    entityPks: nodeUserPks,
    requestId,
    statusCode,
  };
}

export function createNodeUsersDeleteOneFailAction(
  error: NodeUsersDeleteOneFailAction['error'],
  requestId: NodeUsersDeleteOneFailAction['requestId'],
): NodeUsersDeleteOneFailAction {
  return {
    type: NodeUsersActionTypes.NODE_USERS_DELETE_ONE__FAIL,
    error,
    requestId,
  };
}
