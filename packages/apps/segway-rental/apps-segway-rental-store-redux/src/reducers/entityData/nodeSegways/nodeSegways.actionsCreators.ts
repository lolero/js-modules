import { v4 as uuidv4 } from 'uuid';
import {
  NodeSegwaysActionTypes,
  NodeSegwaysCreateOneFailAction,
  NodeSegwaysCreateOneRequestAction,
  NodeSegwaysCreateOneSuccessAction,
  NodeSegwaysDeleteOneFailAction,
  NodeSegwaysDeleteOneRequestAction,
  NodeSegwaysDeleteOneSuccessAction,
  NodeSegwaysGetManyFailAction,
  NodeSegwaysGetManyRequestAction,
  NodeSegwaysGetManySuccessAction,
  NodeSegwaysUpdateOneWholeFailAction,
  NodeSegwaysUpdateOneWholeRequestAction,
  NodeSegwaysUpdateOneWholeSuccessAction,
} from './nodeSegways.actionsTypes';

export function createNodeSegwaysGetManyRequestAction(): NodeSegwaysGetManyRequestAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeSegwaysGetManySuccessAction(
  nodeSegways: NodeSegwaysGetManySuccessAction['wholeEntities'],
  flush: boolean,
): NodeSegwaysGetManySuccessAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__SUCCESS,
    wholeEntities: nodeSegways,
    flush,
  };
}

export function createNodeSegwaysGetManyFailAction(
  error: NodeSegwaysGetManyFailAction['error'],
  requestId: NodeSegwaysGetManyFailAction['requestId'],
): NodeSegwaysGetManyFailAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeSegwaysCreateOneRequestAction(
  nodeSegway: NodeSegwaysCreateOneRequestAction['requestMetadata']['entity'],
): NodeSegwaysCreateOneRequestAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__REQUEST,
    requestMetadata: {
      entity: nodeSegway,
    },
    requestId: uuidv4(),
  };
}

export function createNodeSegwaysCreateOneSuccessAction(
  requestId: NodeSegwaysCreateOneSuccessAction['requestId'],
): NodeSegwaysCreateOneSuccessAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__SUCCESS,
    requestId,
  };
}

export function createNodeSegwaysCreateOneFailAction(
  error: NodeSegwaysCreateOneFailAction['error'],
  requestId: NodeSegwaysCreateOneFailAction['requestId'],
): NodeSegwaysCreateOneFailAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeSegwaysUpdateOneWholeRequestAction(
  nodeSegwayPk: NodeSegwaysUpdateOneWholeRequestAction['requestMetadata']['entityPk'],
  nodeSegway: NodeSegwaysUpdateOneWholeRequestAction['requestMetadata']['entity'],
): NodeSegwaysUpdateOneWholeRequestAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__REQUEST,
    requestMetadata: {
      entityPk: nodeSegwayPk,
      entity: nodeSegway,
    },
    requestId: uuidv4(),
  };
}

export function createNodeSegwaysUpdateOnePartialSuccessAction(
  requestId: NodeSegwaysUpdateOneWholeSuccessAction['requestId'],
): NodeSegwaysUpdateOneWholeSuccessAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__SUCCESS,
    requestId,
  };
}

export function createNodeSegwaysUpdateOnePartialFailAction(
  error: NodeSegwaysUpdateOneWholeFailAction['error'],
  requestId: NodeSegwaysUpdateOneWholeFailAction['requestId'],
): NodeSegwaysUpdateOneWholeFailAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__FAIL,
    error,
    requestId,
  };
}

export function createNodeSegwaysDeleteOneRequestAction(
  nodeSegwayPk: NodeSegwaysDeleteOneRequestAction['requestMetadata']['entityPk'],
): NodeSegwaysDeleteOneRequestAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__REQUEST,
    requestMetadata: {
      entityPk: nodeSegwayPk,
    },
    requestId: uuidv4(),
  };
}

export function createNodeSegwaysDeleteOneSuccessAction(
  nodeSegwayPks: NodeSegwaysDeleteOneSuccessAction['entityPks'],
  requestId: NodeSegwaysDeleteOneSuccessAction['requestId'],
  statusCode: NodeSegwaysDeleteOneSuccessAction['statusCode'],
): NodeSegwaysDeleteOneSuccessAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__SUCCESS,
    entityPks: nodeSegwayPks,
    requestId,
    statusCode,
  };
}

export function createNodeSegwaysDeleteOneFailAction(
  error: NodeSegwaysDeleteOneFailAction['error'],
  requestId: NodeSegwaysDeleteOneFailAction['requestId'],
): NodeSegwaysDeleteOneFailAction {
  return {
    type: NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__FAIL,
    error,
    requestId,
  };
}
