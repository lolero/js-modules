import {
  call,
  CallEffect,
  ChannelTakeEffect,
  fork,
  ForkEffect,
  put,
  PutEffect,
  take,
  takeEvery,
  takeLeading,
} from 'redux-saga/effects';
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
import {
  AuthAdapter,
  AuthInitResult,
  ClientType,
  SigninAction,
} from './stateAuth.types';
import { StateAuthAdaptersWeb } from './stateAuth.adapters.web';
import { StateAuthAdaptersNative } from './stateAuth.adapters.native';

let authAdapter: AuthAdapter;

export function* stateAuthMonitorSaga(
  onSignoutCallback: StateAuthInitializeRequestAction['requestMetadata']['onSignoutCallback'],
): Generator<
  CallEffect | ChannelTakeEffect<boolean> | PutEffect,
  void,
  EventChannel<boolean> | boolean
> {
  const isTokenValidChannel = (yield call([
    authAdapter,
    authAdapter.getIsTokenValidChannel,
  ])) as EventChannel<boolean>;

  while (true) {
    const isTokenValid = (yield take(isTokenValidChannel)) as boolean;

    if (isTokenValid) {
      const tokens = authAdapter.getTokens()!;

      if (tokens) {
        axiosRequestSetAuthHeader(tokens.access.token);

        yield put(
          createStateAuthUpdatePartialReducerMetadataSuccessAction({
            isAuthenticated: authAdapter.isAuthenticated(),
            tokens,
          }),
        );
      }
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
  AuthInitResult
> {
  const {
    clientType,
    keycloakConfig,
    keycloakInitOptions,
    onSigninCallback,
    onSignoutCallback,
  } = requestMetadata;

  if (clientType === ClientType.web) {
    authAdapter = new StateAuthAdaptersWeb(keycloakConfig);
  } else {
    authAdapter = new StateAuthAdaptersNative(keycloakConfig);
  }

  try {
    yield fork(stateAuthMonitorSaga, onSignoutCallback);

    const authInitResult = (yield call(
      [authAdapter, authAdapter.initialize],
      keycloakInitOptions,
    )) as AuthInitResult;

    yield put(
      createStateAuthInitializeSuccessAction(
        {
          isKeycloakReady: true,
        },
        requestId,
      ),
    );

    if (authInitResult.isAuthenticated) {
      onSigninCallback?.();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('stateAuthInitializeSaga error:', err);
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
  const { signinAction, keycloakLoginOptions, onSigninCallback } =
    requestMetadata;

  try {
    switch (signinAction) {
      case SigninAction.signup:
        yield call([authAdapter, authAdapter.register], keycloakLoginOptions);
        break;
      case SigninAction.login:
        yield call([authAdapter, authAdapter.login], keycloakLoginOptions);
        break;
      default:
        throw new Error('Unknown signin action');
    }

    yield put(createStateAuthSigninSuccessAction(requestId));

    onSigninCallback?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('stateAuthSigninSaga error:', err);
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
  const { keycloakLogoutOptions, onSignoutCallback } = requestMetadata;

  try {
    yield call([authAdapter, authAdapter.logout], keycloakLogoutOptions);

    yield put(createStateAuthSignoutSuccessAction(requestId));

    onSignoutCallback?.();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('stateAuthSignoutSaga error:', err);
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
