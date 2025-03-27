import {
  all,
  AllEffect,
  CallEffect,
  call,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { NodeUsersReducer } from '../../entityData/nodeUsers/nodeUsers.types';
import {
  StateSettingsActionTypes,
  StateSettingsGetProfileRequestAction,
  StateSettingsResetPasswordRequestAction,
  StateSettingsSignoutRequestAction,
  StateSettingsUpdatePartialReducerMetadataRequestAction,
  StateSettingsUpdateProfileRequestAction,
} from './stateSettings.actions.types';
import {
  createStateSettingsGetProfileFailAction,
  createStateSettingsGetProfileSuccessAction,
  createStateSettingsResetPasswordFailAction,
  createStateSettingsResetPasswordSuccessAction,
  createStateSettingsSignoutFailAction,
  createStateSettingsSignoutSuccessAction,
  createStateSettingsUpdatePartialReducerMetadataFailAction,
  createStateSettingsUpdatePartialReducerMetadataSuccessAction,
  createStateSettingsUpdateProfileFailAction,
  createStateSettingsUpdateProfileSuccessAction,
} from './stateSettings.actions.creators';
import {
  StateSettingsGetProfileServiceResponse,
  StateSettingsResetPasswordServiceResponse,
  StateSettingsUpdateProfileServiceResponse,
} from './stateSettings.services.types';
import {
  stateSettingsGetProfileService,
  stateSettingsResetPasswordService,
  stateSettingsUpdateProfileService,
} from './stateSettings.services';
import {
  createNodeUsersGetManySuccessAction,
  createNodeUsersGetOneSuccessAction,
  createNodeUsersUpdateOnePartialSuccessAction,
} from '../../entityData/nodeUsers/nodeUsers.actions.creators';
import { normalizeUsersPublicDtoArray } from '../../entityData/nodeUsers/nodeUsers.normalizer';

export function* stateSettingsUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateSettingsUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateSettingsUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateSettingsUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateSettingsGetProfileSaga({
  requestId,
}: StateSettingsGetProfileRequestAction): Generator<
  CallEffect | AllEffect<PutEffect> | PutEffect,
  void,
  StateSettingsGetProfileServiceResponse | NodeUsersReducer['data']
> {
  try {
    const { data: profile, status: statusCode } = (yield call(
      stateSettingsGetProfileService,
    )) as StateSettingsGetProfileServiceResponse;

    const normalizedNodeUsers = (yield call(normalizeUsersPublicDtoArray, [
      profile,
    ])) as NodeUsersReducer['data'];

    yield all([
      put(
        createStateSettingsGetProfileSuccessAction(
          {
            profile,
          },
          requestId,
          statusCode,
        ),
      ),
      put(createNodeUsersGetOneSuccessAction(normalizedNodeUsers, '')),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateSettingsGetProfileFailAction(err.message, requestId));
  }
}

export function* stateSettingsUpdateProfileSaga({
  requestMetadata,
  requestId,
}: StateSettingsUpdateProfileRequestAction): Generator<
  CallEffect | AllEffect<PutEffect> | PutEffect,
  void,
  StateSettingsUpdateProfileServiceResponse | NodeUsersReducer['data']
> {
  const { usersUpdateOnePartialDto } = requestMetadata;

  try {
    const { data: profile, status: statusCode } = (yield call(
      stateSettingsUpdateProfileService,
      usersUpdateOnePartialDto,
    )) as StateSettingsUpdateProfileServiceResponse;

    const normalizedNodeUsers = (yield call(normalizeUsersPublicDtoArray, [
      profile,
    ])) as NodeUsersReducer['data'];

    yield all([
      put(
        createStateSettingsUpdateProfileSuccessAction(
          {
            profile,
          },
          requestId,
          statusCode,
        ),
      ),
      put(createNodeUsersUpdateOnePartialSuccessAction(normalizedNodeUsers)),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateSettingsUpdateProfileFailAction(err.message, requestId),
    );
  }
}

export function* stateSettingsResetPasswordSaga({
  requestId,
}: StateSettingsResetPasswordRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  StateSettingsResetPasswordServiceResponse
> {
  try {
    const { status: statusCode } = (yield call(
      stateSettingsResetPasswordService,
    )) as StateSettingsResetPasswordServiceResponse;

    yield put(
      createStateSettingsResetPasswordSuccessAction(requestId, statusCode),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateSettingsResetPasswordFailAction(err.message, requestId),
    );
  }
}

export function* stateSettingsSignoutSaga({
  requestId,
}: StateSettingsSignoutRequestAction): Generator<
  CallEffect | AllEffect<PutEffect> | PutEffect,
  void,
  void
> {
  try {
    yield all([
      put(createNodeUsersGetManySuccessAction({}, '', undefined, true)),
      put(
        createStateSettingsSignoutSuccessAction(
          {
            profile: null,
          },
          requestId,
        ),
      ),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(createStateSettingsSignoutFailAction(err.message, requestId));
  }
}

export function* stateSettingsSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    stateSettingsUpdatePartialReducerMetadataSaga,
  );
  yield takeLatest(
    StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__REQUEST,
    stateSettingsGetProfileSaga,
  );
  yield takeLatest(
    StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__REQUEST,
    stateSettingsUpdateProfileSaga,
  );
  yield takeLatest(
    StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__REQUEST,
    stateSettingsResetPasswordSaga,
  );
  yield takeLatest(
    StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__REQUEST,
    stateSettingsSignoutSaga,
  );
}
