import {
  fork,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  call,
  take,
  CallEffect,
  ChannelTakeEffect,
  all,
  AllEffect,
} from 'redux-saga/effects';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth';
import { EventChannel } from 'redux-saga';
import { axiosRequestSetAuthHeader } from '@js-modules/common-utils-general';
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
import { createAuthOnChangeChannel } from './stateAuth.sagasUtils';
import { nodeUsersGetOneService } from '../../entityData/nodeUsers/nodeUsers.services';
import { NodeUsersGetOneServiceResponse } from '../../entityData/nodeUsers/nodeUsers.servicesTypes';

export function* stateAuthEventListenerSaga(): Generator<
  | CallEffect
  | ChannelTakeEffect<{
      authUser: User | null;
      authError: Error | null;
    }>
  | AllEffect<PutEffect>
  | PutEffect,
  void,
  | EventChannel<{
      authUser: User | null;
      authError: Error | null;
    }>
  | {
      authUser: User | null;
      authError: Error | null;
    }
  | NodeUsersGetOneServiceResponse
> {
  const authOnChangeChannel = (yield call(
    createAuthOnChangeChannel,
  )) as EventChannel<{
    authUser: User | null;
    authError: Error | null;
  }>;

  while (true) {
    const { authUser, authError } = (yield take(authOnChangeChannel)) as {
      authUser: User | null;
      authError: Error | null;
    };

    if (authUser) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      axiosRequestSetAuthHeader(authUser.accessToken ?? null);

      const { data: nodeUserRaw } = (yield call(
        nodeUsersGetOneService,
        authUser.uid,
      )) as NodeUsersGetOneServiceResponse;

      yield all([
        put(
          createStateAuthUpdatePartialReducerMetadataSuccessAction({
            authUser,
            authUserRole: nodeUserRaw.role,
            authError: null,
          }),
        ),
        put(createStateAuthLoginSuccessAction('')),
      ]);
    }

    if (authError) {
      yield put(
        createStateAuthUpdatePartialReducerMetadataSuccessAction({
          authUser: null,
          authUserRole: null,
          authError,
        }),
      );
    }
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
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateAuthUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateAuthUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateAuthLoginSaga({
  requestMetadata,
  requestId,
}: StateAuthLoginRequestAction): Generator<CallEffect | PutEffect, void, void> {
  try {
    const { loginMethod } = requestMetadata;

    switch (loginMethod) {
      default:
        yield call(signInWithPopup, getAuth(), new GoogleAuthProvider());
    }

    yield put(createStateAuthLoginSuccessAction(requestId));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateAuthLoginFailAction(err.message, requestId));
  }
}

export function* stateAuthLogoutSaga({
  requestId,
}: StateAuthLogoutRequestAction): Generator<
  Promise<void> | PutEffect,
  void,
  void
> {
  try {
    yield getAuth().signOut();

    yield put(
      createStateAuthLogoutSuccessAction(
        {
          authUser: null,
          authUserRole: null,
          authError: null,
        },
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateAuthLogoutFailAction(err.message, requestId));
  }
}

export function* stateAuthSagas(): Generator<ForkEffect, void, void> {
  yield fork(stateAuthEventListenerSaga);
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
