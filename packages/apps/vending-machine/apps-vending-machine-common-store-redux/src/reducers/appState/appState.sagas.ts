import { fork } from 'redux-saga/effects';

import { stateAuthSagas } from '@js-modules/common-redux-reducer-auth-keycloak';
import { stateDialogsSagas } from './stateDialogs/stateDialogs.sagas';
import { stateMainSagas } from './stateMain/stateMain.sagas';
import { stateShoppingCartSagas } from './stateShoppingCart/stateShoppingCart.sagas';

export const appStateSagas = [
  fork(stateAuthSagas),
  fork(stateDialogsSagas),
  fork(stateMainSagas),
  fork(stateShoppingCartSagas),
];
