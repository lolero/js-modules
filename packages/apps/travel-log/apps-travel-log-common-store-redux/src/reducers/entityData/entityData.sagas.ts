import { fork } from 'redux-saga/effects';

import { nodeChainsSagas } from './nodeChains/nodeChains.sagas';
import { nodeTransactionsSagas } from './nodeTransactions/nodeTransactions.sagas';
import { nodeUsersSagas } from './nodeUsers/nodeUsers.sagas';

export const entityDataSagas = [
  fork(nodeChainsSagas),
  fork(nodeTransactionsSagas),
  fork(nodeUsersSagas),
];
