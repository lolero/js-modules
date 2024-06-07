import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  ChannelTakeEffect,
  takeEvery,
  takeLeading,
  fork,
  take,
} from 'redux-saga/effects';
import Keycloak from 'keycloak-js';
import { EventChannel } from 'redux-saga';
import { axiosRequestSetAuthHeader } from '@js-modules/common-utils-general';
import {
  StateAuthActionTypes,
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
  StateAuthUpdatePartialReducerMetadataRequestAction,
} from './stateAuth.actions.types';
import {
  createStateAuthInitializeFailAction,
  createStateAuthInitializeSuccessAction,
  createStateAuthSigninFailAction,
  createStateAuthSigninSuccessAction,
  createStateAuthSignoutFailAction,
  createStateAuthSignoutSuccessAction,
  createStateAuthUpdatePartialReducerMetadataSuccessAction,
} from './stateAuth.actions.creators';
import { KeycloakTokens, SigninAction } from './stateAuth.types';
import { stateAuthUtilCreateIsKeycloakTokenValidChannel } from './stateAuth.util.createIsKeycloakTokenValidChannel';

let keycloak: Keycloak;

export function* stateAuthMonitorSaga(
  keycloakInstance: Keycloak,
  onSignoutCallback: StateAuthInitializeRequestAction['requestMetadata']['onSignoutCallback'],
): Generator<
  CallEffect | ChannelTakeEffect<boolean> | PutEffect,
  void,
  EventChannel<boolean> | boolean
> {
  const isKeycloakTokenValidChannel = (yield call(
    stateAuthUtilCreateIsKeycloakTokenValidChannel,
    keycloakInstance,
  )) as EventChannel<boolean>;

  while (true) {
    const isKeycloakTokenValid = (yield take(
      isKeycloakTokenValidChannel,
    )) as boolean;

    if (isKeycloakTokenValid) {
      const keycloakTokens: KeycloakTokens = {
        id: {
          token: keycloakInstance.idToken!,
          metadata: keycloakInstance.idTokenParsed!,
        },
        access: {
          token: keycloakInstance.token!,
          metadata: keycloakInstance.tokenParsed!,
        },
        refresh: {
          token: keycloakInstance.refreshToken!,
          metadata: keycloakInstance.refreshTokenParsed!,
        },
      };

      axiosRequestSetAuthHeader(keycloakTokens.access.token);

      yield put(
        createStateAuthUpdatePartialReducerMetadataSuccessAction({
          isAuthenticated: keycloak.authenticated,
          tokens: keycloakTokens,
        }),
      );
    } else {
      axiosRequestSetAuthHeader(null);

      yield put(
        createStateAuthUpdatePartialReducerMetadataSuccessAction({
          isAuthenticated: false,
          tokens: null,
        }),
      );

      onSignoutCallback?.();
    }
  }
}

export function* stateAuthInitializeSaga({
  requestMetadata,
  requestId,
}: StateAuthInitializeRequestAction): Generator<
  ForkEffect | CallEffect | PutEffect,
  void,
  boolean
> {
  const { keycloakConfig, onSigninCallback, onSignoutCallback } =
    requestMetadata;

  keycloak = new Keycloak(keycloakConfig);

  try {
    yield fork(stateAuthMonitorSaga, keycloak, onSignoutCallback);

    const isAuthenticated = (yield call(keycloak.init, {
      onLoad: 'check-sso',
      // silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      checkLoginIframe: false,
    })) as boolean;

    yield put(
      createStateAuthInitializeSuccessAction(
        {
          isKeycloakReady: true,
        },
        requestId,
      ),
    );

    if (isAuthenticated) {
      onSigninCallback?.();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createStateAuthInitializeFailAction(err, requestId));
  }
}

export function* stateAuthSigninSaga({
  requestMetadata,
  requestId,
}: StateAuthSigninRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  void
> {
  const { signinAction, redirectUri, onSigninCallback } = requestMetadata;

  try {
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

    yield put(createStateAuthSigninSuccessAction(requestId));

    onSigninCallback?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createStateAuthSigninFailAction(err, requestId));
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
  const { redirectUri, onSignoutCallback } = requestMetadata;

  try {
    yield call(keycloak.logout, { redirectUri });

    yield put(createStateAuthSignoutSuccessAction(requestId));

    onSignoutCallback?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createStateAuthSignoutFailAction(err, requestId));
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

export function* stateAuthSagas(): Generator<ForkEffect, void, void> {
  yield takeLeading(
    StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST,
    stateAuthInitializeSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST,
    stateAuthSigninSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST,
    stateAuthSignoutSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    stateAuthUpdatePartialReducerMetadataSaga,
  );
}
