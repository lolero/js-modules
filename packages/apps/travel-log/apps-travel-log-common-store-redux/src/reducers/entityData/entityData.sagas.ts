import { fork } from 'redux-saga/effects';

import { nodeLogEntriesSagas } from './nodeLogEntries/nodeLogEntries.sagas';
import { nodeUsersSagas } from './nodeUsers/nodeUsers.sagas';

export const entityDataSagas = [
  fork(nodeLogEntriesSagas),
  fork(nodeUsersSagas),
];
