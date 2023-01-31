import { fork } from 'redux-saga/effects';

import { stateMainSagas } from './stateMain/stateMain.sagas';
import { stateWeb3Sagas } from './stateWeb3/stateWeb3.sagas';

export const appStateSagas = [fork(stateMainSagas), fork(stateWeb3Sagas)];
