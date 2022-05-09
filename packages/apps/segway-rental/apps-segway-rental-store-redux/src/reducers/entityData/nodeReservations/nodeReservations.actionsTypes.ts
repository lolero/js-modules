import {
  CreateOneEntityRequestMetadata,
  DeleteEntitiesAction,
  DeleteManyEntitiesRequestMetadata,
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SaveNothingAction,
  SaveWholeEntitiesAction,
  UpdateOneWholeEntityRequestMetadata,
} from 'normalized-reducers-utils';
import {
  NodeReservation,
  NodeReservationsReducer,
} from './nodeReservations.types';

export enum NodeReservationsActionTypes {
  NODE_RESERVATIONS_GET_MANY__REQUEST = 'NODE_RESERVATIONS_GET_MANY__REQUEST',
  NODE_RESERVATIONS_GET_MANY__SUCCESS = 'NODE_RESERVATIONS_GET_MANY__SUCCESS',
  NODE_RESERVATIONS_GET_MANY__FAIL = 'NODE_RESERVATIONS_GET_MANY__FAIL',
  NODE_RESERVATIONS_CREATE_ONE__REQUEST = 'NODE_RESERVATIONS_CREATE_ONE__REQUEST',
  NODE_RESERVATIONS_CREATE_ONE__SUCCESS = 'NODE_RESERVATIONS_CREATE_ONE__SUCCESS',
  NODE_RESERVATIONS_CREATE_ONE__FAIL = 'NODE_RESERVATIONS_CREATE_ONE__FAIL',
  NODE_RESERVATIONS_UPDATE_ONE_WHOLE__REQUEST = 'NODE_RESERVATIONS_UPDATE_ONE_WHOLE__REQUEST',
  NODE_RESERVATIONS_UPDATE_ONE_WHOLE__SUCCESS = 'NODE_RESERVATIONS_UPDATE_ONE_WHOLE__SUCCESS',
  NODE_RESERVATIONS_UPDATE_ONE_WHOLE__FAIL = 'NODE_RESERVATIONS_UPDATE_ONE_WHOLE__FAIL',
  NODE_RESERVATIONS_DELETE_MANY__REQUEST = 'NODE_RESERVATIONS_DELETE_MANY__REQUEST',
  NODE_RESERVATIONS_DELETE_MANY__SUCCESS = 'NODE_RESERVATIONS_DELETE_MANY__SUCCESS',
  NODE_RESERVATIONS_DELETE_MANY__FAIL = 'NODE_RESERVATIONS_DELETE_MANY__FAIL',
}

export type NodeReservationsGetManyRequestAction = RequestAction<
  NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata
>;

export type NodeReservationsGetManySuccessAction = SaveWholeEntitiesAction<
  NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__SUCCESS,
  NodeReservationsReducer['metadata'],
  NodeReservation
>;

export type NodeReservationsGetManyFailAction =
  FailAction<NodeReservationsActionTypes.NODE_RESERVATIONS_GET_MANY__FAIL>;

export type NodeReservationsCreateOneRequestAction = RequestAction<
  NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__REQUEST,
  CreateOneEntityRequestMetadata<NodeReservation>
>;

export type NodeReservationsCreateOneSuccessAction =
  SaveNothingAction<NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__SUCCESS>;

export type NodeReservationsCreateOneFailAction =
  FailAction<NodeReservationsActionTypes.NODE_RESERVATIONS_CREATE_ONE__FAIL>;

export type NodeReservationsUpdateOneWholeRequestAction = RequestAction<
  NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__REQUEST,
  UpdateOneWholeEntityRequestMetadata<NodeReservation>
>;

export type NodeReservationsUpdateOneWholeSuccessAction =
  SaveNothingAction<NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__SUCCESS>;

export type NodeReservationsUpdateOneWholeFailAction =
  FailAction<NodeReservationsActionTypes.NODE_RESERVATIONS_UPDATE_ONE_WHOLE__FAIL>;

export type NodeReservationsDeleteManyRequestAction = RequestAction<
  NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__REQUEST,
  DeleteManyEntitiesRequestMetadata
>;

export type NodeReservationsDeleteManySuccessAction = DeleteEntitiesAction<
  NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__SUCCESS,
  NodeReservationsReducer['metadata']
>;

export type NodeReservationsDeleteManyFailAction =
  FailAction<NodeReservationsActionTypes.NODE_RESERVATIONS_DELETE_MANY__FAIL>;

export type NodeReservationsReducerHittingAction =
  | NodeReservationsGetManyRequestAction
  | NodeReservationsGetManySuccessAction
  | NodeReservationsGetManyFailAction
  | NodeReservationsCreateOneRequestAction
  | NodeReservationsCreateOneSuccessAction
  | NodeReservationsCreateOneFailAction
  | NodeReservationsUpdateOneWholeRequestAction
  | NodeReservationsUpdateOneWholeSuccessAction
  | NodeReservationsUpdateOneWholeFailAction
  | NodeReservationsDeleteManyRequestAction
  | NodeReservationsDeleteManySuccessAction
  | NodeReservationsDeleteManyFailAction;
