import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
} from 'redux-saga/effects';
import Keycloak from 'keycloak-js';
import {
  StateAuthActionTypes,
  StateAuthInitializeRequestAction,
  StateAuthSigninRequestAction,
  StateAuthSignoutRequestAction,
  StateAuthUpdatePartialReducerMetadataRequestAction,
} from './stateAuth.actionsTypes';
import {
  createStateAuthInitializeFailAction,
  createStateAuthInitializeSuccessAction,
  createStateAuthSigninFailAction,
  createStateAuthSigninSuccessAction,
  createStateAuthSignoutFailAction,
  createStateAuthSignoutSuccessAction,
  createStateAuthUpdatePartialReducerMetadataSuccessAction,
} from './stateAuth.actionsCreators';
import {
  KeycloakTokens,
  SigninAction,
  StateAuthReducer,
} from './stateAuth.types';

let keycloak: Keycloak;

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

export function* stateAuthInitializeSaga({
  requestMetadata,
  requestId,
}: StateAuthInitializeRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  boolean
> {
  const { keycloakConfig } = requestMetadata;

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
      const keycloakTokens: KeycloakTokens = {
        id: {
          token: keycloak.idToken!,
          metadata: keycloak.idTokenParsed!,
        },
        access: {
          token: keycloak.token!,
          metadata: keycloak.tokenParsed!,
        },
        refresh: {
          token: keycloak.refreshToken!,
          metadata: keycloak.refreshTokenParsed!,
        },
      };
      partialStateAuthReducerMetadata.tokens = keycloakTokens;
    }

    yield put(
      createStateAuthInitializeSuccessAction(
        partialStateAuthReducerMetadata,
        requestId,
      ),
    );

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
  const { signinAction, redirectUri } = requestMetadata;

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

    const keycloakTokens: KeycloakTokens = {
      id: {
        token: keycloak.idToken!,
        metadata: keycloak.idTokenParsed!,
      },
      access: {
        token: keycloak.token!,
        metadata: keycloak.tokenParsed!,
      },
      refresh: {
        token: keycloak.refreshToken!,
        metadata: keycloak.refreshTokenParsed!,
      },
    };
    yield put(
      createStateAuthSigninSuccessAction(
        {
          isAuthenticated: true,
          tokens: keycloakTokens,
        },
        requestId,
      ),
    );
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
  const { redirectUri } = requestMetadata;

  try {
    yield call(keycloak.logout, { redirectUri });

    yield put(
      createStateAuthSignoutSuccessAction(
        {
          isAuthenticated: false,
          tokens: null,
        },
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    yield put(createStateAuthSignoutFailAction(err, requestId));
  }
}

export function* stateAuthSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    stateAuthUpdatePartialReducerMetadataSaga,
  );
  yield takeEvery(
    StateAuthActionTypes.STATE_AUTH_INITIALIZE_REQUEST,
    stateAuthInitializeSaga,
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
