import { v4 as uuidv4 } from 'uuid';
import {
  NodeReservationsActionTypes,
  NodeReservationsCreateOneFailAction,
  NodeReservationsCreateOneRequestAction,
  NodeReservationsCreateOneSuccessAction,
  NodeReservationsDeleteManyFailAction,
  NodeReservationsDeleteManyRequestAction,
  NodeReservationsDeleteManySuccessAction,
  NodeReservationsGetManyFailAction,
  NodeReservationsGetManyRequestAction,
  NodeReservationsGetManySuccessAction,
  NodeReservationsUpdateOneWholeFailAction,
  NodeReservationsUpdateOneWholeRequestAction,
  NodeReservationsUpdateOneWholeSuccessAction,
} from './nodeReservations.actionsTypes';

export function createNodeReservationsGetManyRequestAction(): NodeReservationsGetManyRequestAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__REQUEST,
    requestMetadata: {},
    requestId: uuidv4(),
  };
}

export function createNodeReservationsGetManySuccessAction(
  nodeReservations: NodeReservationsGetManySuccessAction['wholeEntities'],
  flush: boolean,
): NodeReservationsGetManySuccessAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__SUCCESS,
    wholeEntities: nodeReservations,
    flush,
  };
}

export function createNodeReservationsGetManyFailAction(
  error: NodeReservationsGetManyFailAction['error'],
  requestId: NodeReservationsGetManyFailAction['requestId'],
): NodeReservationsGetManyFailAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__FAIL,
    error,
    requestId,
  };
}

export function createNodeReservationsCreateOneRequestAction(
  nodeReservation: NodeReservationsCreateOneRequestAction['requestMetadata']['entity'],
): NodeReservationsCreateOneRequestAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__REQUEST,
    requestMetadata: {
      entity: nodeReservation,
    },
    requestId: uuidv4(),
  };
}

export function createNodeReservationsCreateOneSuccessAction(
  requestId: NodeReservationsCreateOneSuccessAction['requestId'],
): NodeReservationsCreateOneSuccessAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__SUCCESS,
    requestId,
  };
}

export function createNodeReservationsCreateOneFailAction(
  error: NodeReservationsCreateOneFailAction['error'],
  requestId: NodeReservationsCreateOneFailAction['requestId'],
): NodeReservationsCreateOneFailAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__FAIL,
    error,
    requestId,
  };
}

export function createNodeReservationsUpdateOneWholeRequestAction(
  nodeReservationPk: NodeReservationsUpdateOneWholeRequestAction['requestMetadata']['entityPk'],
  nodeReservation: NodeReservationsUpdateOneWholeRequestAction['requestMetadata']['entity'],
): NodeReservationsUpdateOneWholeRequestAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__REQUEST,
    requestMetadata: {
      entityPk: nodeReservationPk,
      entity: nodeReservation,
    },
    requestId: uuidv4(),
  };
}

export function createNodeReservationsUpdateOneWholeSuccessAction(
  requestId: NodeReservationsUpdateOneWholeSuccessAction['requestId'],
): NodeReservationsUpdateOneWholeSuccessAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__SUCCESS,
    requestId,
  };
}

export function createNodeReservationsUpdateOneWholeFailAction(
  error: NodeReservationsUpdateOneWholeFailAction['error'],
  requestId: NodeReservationsUpdateOneWholeFailAction['requestId'],
): NodeReservationsUpdateOneWholeFailAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__FAIL,
    error,
    requestId,
  };
}

export function createNodeReservationsDeleteManyRequestAction(
  nodeReservationPks: NodeReservationsDeleteManyRequestAction['requestMetadata']['entityPks'],
): NodeReservationsDeleteManyRequestAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__REQUEST,
    requestMetadata: {
      entityPks: nodeReservationPks,
    },
    requestId: uuidv4(),
  };
}

export function createNodeReservationsDeleteManySuccessAction(
  nodeReservationPks: NodeReservationsDeleteManySuccessAction['entityPks'],
  requestId: NodeReservationsDeleteManySuccessAction['requestId'],
  statusCode: NodeReservationsDeleteManySuccessAction['statusCode'],
): NodeReservationsDeleteManySuccessAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__SUCCESS,
    entityPks: nodeReservationPks,
    requestId,
    statusCode,
  };
}

export function createNodeReservationsDeleteManyFailAction(
  error: NodeReservationsDeleteManyFailAction['error'],
  requestId: NodeReservationsDeleteManyFailAction['requestId'],
): NodeReservationsDeleteManyFailAction {
  return {
    type: NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__FAIL,
    error,
    requestId,
  };
}
