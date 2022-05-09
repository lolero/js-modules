import { fork } from 'redux-saga/effects';

import { nodeReservationsSagas } from './nodeReservations/nodeReservations.sagas';
import { nodeSegwaysSagas } from './nodeSegways/nodeSegways.sagas';
import { nodeUsersSagas } from './nodeUsers/nodeUsers.sagas';

export const entityDataSagas = [
  fork(nodeReservationsSagas),
  fork(nodeSegwaysSagas),
  fork(nodeUsersSagas),
];
