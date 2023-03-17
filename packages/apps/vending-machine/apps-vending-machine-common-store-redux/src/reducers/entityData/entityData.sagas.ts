import { fork } from 'redux-saga/effects';

import { nodeProductsSagas } from './nodeProducts/nodeProducts.sagas';

export const entityDataSagas = [fork(nodeProductsSagas)];
