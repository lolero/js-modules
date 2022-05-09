import { combineReducers } from 'redux';

import nodeReservationsReducer from './nodeReservations/nodeReservations.reducer';
import nodeSegwaysReducer from './nodeSegways/nodeSegways.reducer';
import nodeUsersReducer from './nodeUsers/nodeUsers.reducer';

export const entityDataReducers = combineReducers({
  nodeReservationsReducer,
  nodeSegwaysReducer,
  nodeUsersReducer,
});
