import {
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  call,
  CallEffect,
} from 'redux-saga/effects';
import Keycloak from 'keycloak-js';
import { keycloakConfig } from '../config/keycloakConfig';
import {
  StateAuthActionTypes,
  StateAuthLoginRequestAction,
  StateAuthLogoutRequestAction,
  StateAuthUpdatePartialReducerMetadataRequestAction,
} from './stateAuth.actionsTypes';
import {
  createStateAuthLoginFailAction,
  createStateAuthLoginSuccessAction,
  createStateAuthLogoutFailAction,
  createStateAuthLogoutSuccessAction,
  createStateAuthUpdatePartialReducerMetadataFailAction,
  createStateAuthUpdatePartialReducerMetadataSuccessAction,
} from './stateAuth.actionsCreators';

export function* stateAuthInitSaga(): Generator<
  CallEffect | PutEffect,
  void,
  boolean
> {
  const keycloak = new Keycloak(keycloakConfig);

  try {
    const isAuthenticated = yield call<typeof keycloak.init>(keycloak.init, {
      onLoad: 'check-sso',
    });

    if (isAuthenticated) {
      yield put(
        createStateAuthUpdatePartialReducerMetadataSuccessAction({
          token: keycloak.token,
        }),
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(
      createStateAuthUpdatePartialReducerMetadataFailAction(err.message, ''),
    );
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

export function* stateAuthLoginSaga({
  requestMetadata,
  requestId,
}: StateAuthLoginRequestAction): Generator<CallEffect | PutEffect, void, void> {
  // try {
  //   const { loginMethod } = requestMetadata;
  //
  //   switch (loginMethod) {
  //     default:
  //       yield call(signInWithPopup, getAuth(), new GoogleAuthProvider());
  //   }
  //
  //   yield put(createStateAuthLoginSuccessAction(requestId));
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (err: any) {
  //   yield put(createStateAuthLoginFailAction(err.message, requestId));
  // }
}

export function* stateAuthLogoutSaga({
  requestId,
}: StateAuthLogoutRequestAction): Generator<
  Promise<void> | PutEffect,
  void,
  void
> {
  // try {
  //   yield getAuth().signOut();
  //
  //   yield put(
  //     createStateAuthLogoutSuccessAction(
  //       {
  //         authUser: null,
  //         authUserRole: null,
  //         authError: null,
  //       },
  //       requestId,
  //     ),
  //   );
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (err: any) {
  //   // eslint-disable-next-line no-console
  //   console.error(err.message);
  //   yield put(createStateAuthLogoutFailAction(err.message, requestId));
  // }
}

export function* stateAuthSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    stateAuthUpdatePartialReducerMetadataSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_LOGIN_REQUEST,
    stateAuthLoginSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_LOGOUT_REQUEST,
    stateAuthLogoutSaga,
  );
}
