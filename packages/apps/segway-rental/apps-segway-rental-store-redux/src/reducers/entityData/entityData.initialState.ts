import { EntityDataReducers } from './entityData.types';

import { nodeReservationsInitialState } from './nodeReservations/nodeReservations.initialState';
import { nodeSegwaysInitialState } from './nodeSegways/nodeSegways.initialState';
import { nodeUsersInitialState } from './nodeUsers/nodeUsers.initialState';

export const entityDataInitialState: EntityDataReducers = {
  nodeReservationsReducer: nodeReservationsInitialState,
  nodeSegwaysReducer: nodeSegwaysInitialState,
  nodeUsersReducer: nodeUsersInitialState,
};
