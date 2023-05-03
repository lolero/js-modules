import { fork } from 'redux-saga/effects';

import { stateAuthSagas } from '@js-modules/common-redux-reducer-auth-keycloak';
import { stateMainSagas } from './stateMain/stateMain.sagas';
import { stateSettingsSagas } from './stateSettings/stateSettings.sagas';

export const appStateSagas = [
  fork(stateAuthSagas),
  fork(stateMainSagas),
  fork(stateSettingsSagas),
];
