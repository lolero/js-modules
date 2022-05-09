import { fork } from 'redux-saga/effects';

import { stateAuthSagas } from './stateAuth/stateAuth.sagas';
import { stateDialogsSagas } from './stateDialogs/stateDialogs.sagas';
import { stateMainSagas } from './stateMain/stateMain.sagas';

export const appStateSagas = [
  fork(stateAuthSagas),
  fork(stateDialogsSagas),
  fork(stateMainSagas),
];
