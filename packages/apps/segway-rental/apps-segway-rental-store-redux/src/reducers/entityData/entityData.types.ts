import { NodeReservationsReducer } from './nodeReservations/nodeReservations.types';
import { NodeReservationsReducerHittingAction } from './nodeReservations/nodeReservations.actionsTypes';
import { NodeSegwaysReducer } from './nodeSegways/nodeSegways.types';
import { NodeSegwaysReducerHittingAction } from './nodeSegways/nodeSegways.actionsTypes';
import { NodeUsersReducer } from './nodeUsers/nodeUsers.types';
import { NodeUsersReducerHittingAction } from './nodeUsers/nodeUsers.actionsTypes';

export type EntityDataReducerHittingAction =
  | NodeReservationsReducerHittingAction
  | NodeSegwaysReducerHittingAction
  | NodeUsersReducerHittingAction;

export type EntityDataReducers = {
  nodeReservationsReducer: NodeReservationsReducer;
  nodeSegwaysReducer: NodeSegwaysReducer;
  nodeUsersReducer: NodeUsersReducer;
};
