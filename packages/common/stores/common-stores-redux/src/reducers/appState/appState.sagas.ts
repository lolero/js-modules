import { fork } from 'redux-saga/effects';

import { stateMainSagas } from './stateMain/stateMain.sagas';

export const appStateSagas = [fork(stateMainSagas)];
