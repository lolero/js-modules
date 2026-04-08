import type { SagaGenerator } from 'typed-redux-saga';
import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLeading,
} from 'typed-redux-saga';
import { axiosRequestSetAuthHeader } from '@js-modules/common-utils-general';
import {
  createStateAuthInitializeFailAction,
  createStateAuthInitializeSuccessAction,
  createStateAuthSigninFailAction,
  createStateAuthSigninSuccessAction,
  createStateAuthSignoutFailAction,
  createStateAuthSignoutSuccessAction,
  createStateAuthUpdatePartialReducerMetadataSuccessAction,
} from './stateAuth.actions.creators';
import type {
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
  StateAuthUpdatePartialReducerMetadataRequestAction,
} from './stateAuth.actions.types';
import { StateAuthActionTypes } from './stateAuth.actions.types';
import { StateAuthAdapter } from './stateAuth.adapter';
import type { AuthAdapter } from './stateAuth.types';
import { SigninAction } from './stateAuth.types';

let authAdapter: AuthAdapter;

export function* stateAuthMonitorSaga(
  onSignoutCallback: StateAuthInitializeRequestAction['requestMetadata']['onSignoutCallback'],
): SagaGenerator<void> {
  const isTokenValidChannel = yield* call([
    authAdapter,
    authAdapter.getIsTokenValidChannel,
  ]);

  while (true) {
    const isTokenValid = yield* take(isTokenValidChannel);

    if (isTokenValid) {
      const tokens = authAdapter.getTokens()!;

      if (tokens) {
        axiosRequestSetAuthHeader(tokens.access.token);

        yield* put(
          createStateAuthUpdatePartialReducerMetadataSuccessAction({
            isAuthenticated: authAdapter.isAuthenticated(),
            tokens,
          }),
        );
      }
    } else {
      axiosRequestSetAuthHeader(null);

      yield* put(
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
}: StateAuthInitializeRequestAction): SagaGenerator<void> {
  const {
    keycloakServerConfig,
    keycloakInitOptions,
    onSigninCallback,
    onSignoutCallback,
  } = requestMetadata;

  authAdapter = new StateAuthAdapter(keycloakServerConfig);

  try {
    yield* fork(stateAuthMonitorSaga, onSignoutCallback);

    const authInitResult = yield* call(
      [authAdapter, authAdapter.initialize],
      keycloakInitOptions,
    );

    yield* put(
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateAuthInitializeFailAction(message, requestId));
  }
}

export function* stateAuthSigninSaga({
  requestMetadata,
  requestId,
}: StateAuthSigninRequestAction): SagaGenerator<void> {
  const { signinAction, keycloakLoginOptions, onSigninCallback } =
    requestMetadata;

  try {
    switch (signinAction) {
      case SigninAction.signup:
        yield* call([authAdapter, authAdapter.register], keycloakLoginOptions);
        break;
      case SigninAction.login:
        yield* call([authAdapter, authAdapter.login], keycloakLoginOptions);
        break;
      default:
        throw new Error('Unknown signin action');
    }

    yield* put(createStateAuthSigninSuccessAction(requestId));

    onSigninCallback?.();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateAuthSigninFailAction(message, requestId));
  }
}

export function* stateAuthSignoutSaga({
  requestMetadata,
  requestId,
}: StateAuthSignoutRequestAction): SagaGenerator<void> {
  const { keycloakLogoutOptions, onSignoutCallback } = requestMetadata;

  try {
    yield* call([authAdapter, authAdapter.logout], keycloakLogoutOptions);

    yield* put(createStateAuthSignoutSuccessAction(requestId));

    onSignoutCallback?.();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateAuthSignoutFailAction(message, requestId));
  }
}

export function* stateAuthUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateAuthUpdatePartialReducerMetadataRequestAction): SagaGenerator<void> {
  const { partialReducerMetadata } = requestMetadata;

  yield* put(
    createStateAuthUpdatePartialReducerMetadataSuccessAction(
      partialReducerMetadata,
      requestId,
    ),
  );
}

export function* stateAuthSagas(): SagaGenerator<void> {
  yield* all([
    takeLeading(
      StateAuthActionTypes.STATE_AUTH__INITIALIZE__REQUEST,
      stateAuthInitializeSaga,
    ),
    takeEvery(
      StateAuthActionTypes.STATE_AUTH__SIGNIN__REQUEST,
      stateAuthSigninSaga,
    ),
    takeEvery(
      StateAuthActionTypes.STATE_AUTH__SIGNOUT__REQUEST,
      stateAuthSignoutSaga,
    ),
    takeEvery(
      StateAuthActionTypes.STATE_AUTH__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
      stateAuthUpdatePartialReducerMetadataSaga,
    ),
  ]);
}
