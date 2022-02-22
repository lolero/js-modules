import { fork } from 'redux-saga/effects';

import { nodeTransactionsSagas } from './nodeTransactions/nodeTransactions.sagas';

export const entityDataSagas = [fork(nodeTransactionsSagas)];
