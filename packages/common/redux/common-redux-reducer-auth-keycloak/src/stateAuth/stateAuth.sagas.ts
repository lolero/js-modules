import {
  call,
  CallEffect,
  fork,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';
import Keycloak, { KeycloakConfig } from 'keycloak-js';
import {
  StateAuthActionTypes,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
  StateAuthUpdatePartialReducerMetadataRequestAction,
} from './stateAuth.actionsTypes';
import {
  createStateAuthSigninFailAction,
  createStateAuthSigninSuccessAction,
  createStateAuthSignoutFailAction,
  createStateAuthSignoutSuccessAction,
  createStateAuthUpdatePartialReducerMetadataSuccessAction,
} from './stateAuth.actionsCreators';
import { SigninAction, StateAuthReducer } from './stateAuth.types';

const keycloakConfig: KeycloakConfig = {
  url: 'https://localhost:8443/',
  realm: 'travel-log',
  clientId: 'travel-log-web',
};
let keycloak: Keycloak;

export function* stateAuthInitSaga(): Generator<
  CallEffect | PutEffect,
  void,
  boolean
> {
  keycloak = new Keycloak(keycloakConfig);

  try {
    const isAuthenticated = yield call<typeof keycloak.init>(keycloak.init, {
      onLoad: 'check-sso',
      // silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: false,
    });

    const partialStateAuthReducerMetadata: Partial<
      StateAuthReducer['metadata']
    > = {
      isKeycloakReady: true,
      isAuthenticated,
    };

    if (isAuthenticated) {
      partialStateAuthReducerMetadata.token = keycloak.token;
    }

    yield put(
      createStateAuthSigninSuccessAction(partialStateAuthReducerMetadata, ''),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('error: ', err);
  }
}

export function* stateAuthUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateAuthUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  const { partialReducerMetadata } = requestMetadata;

  yield put(
    createStateAuthUpdatePartialReducerMetadataSuccessAction(
      partialReducerMetadata,
      requestId,
    ),
  );
}

export function* stateAuthSigninSaga({
  requestMetadata,
  requestId,
}: StateAuthSigninRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  void
> {
  try {
    const { signinAction, redirectUri } = requestMetadata;

    switch (signinAction) {
      case SigninAction.signup:
        yield call(keycloak.register, { redirectUri });
        break;
      case SigninAction.login:
        yield call(keycloak.login, { redirectUri });
        break;
      default:
        throw new Error('Unknown signin action');
    }

    yield put(
      createStateAuthSigninSuccessAction(
        {
          isAuthenticated: true,
          token: keycloak.token,
        },
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createStateAuthSigninFailAction(err.message, requestId));
  }
}

export function* stateAuthSignoutSaga({
  requestMetadata,
  requestId,
}: StateAuthSignoutRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  void
> {
  try {
    const { redirectUri } = requestMetadata;

    yield call(keycloak.logout, { redirectUri });

    yield put(
      createStateAuthSignoutSuccessAction(
        {
          isAuthenticated: false,
          token: null,
        },
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createStateAuthSignoutFailAction(err.message, requestId));
  }
}

export function* stateAuthSagas(): Generator<ForkEffect, void, void> {
  yield fork(stateAuthInitSaga);
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    stateAuthUpdatePartialReducerMetadataSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_SIGNIN_REQUEST,
    stateAuthSigninSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_SIGNOUT_REQUEST,
    stateAuthSignoutSaga,
  );
}
