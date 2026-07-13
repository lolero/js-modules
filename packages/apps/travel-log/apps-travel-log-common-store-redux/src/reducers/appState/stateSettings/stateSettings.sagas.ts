import type { SagaGenerator } from 'typed-redux-saga';
import { all, call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import {
  createNodeUsersGetManySuccessAction,
  createNodeUsersGetOneSuccessAction,
  createNodeUsersUpdateOnePartialSuccessAction,
} from '../../entityData/nodeUsers/nodeUsers.actions.creators';
import { normalizeUsersPublicDtoArray } from '../../entityData/nodeUsers/nodeUsers.normalizer';
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
import type {
  StateSettingsGetProfileRequestAction,
  StateSettingsResetPasswordRequestAction,
  StateSettingsSignoutRequestAction,
  StateSettingsUpdatePartialReducerMetadataRequestAction,
  StateSettingsUpdateProfileRequestAction,
} from './stateSettings.actions.types';
import { StateSettingsActionTypes } from './stateSettings.actions.types';
import {
  stateSettingsGetProfileService,
  stateSettingsResetPasswordService,
  stateSettingsUpdateProfileService,
} from './stateSettings.services';

function* stateSettingsUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateSettingsUpdatePartialReducerMetadataRequestAction): SagaGenerator<void> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield* put(
      createStateSettingsUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(
      createStateSettingsUpdatePartialReducerMetadataFailAction(
        message,
        requestId,
      ),
    );
  }
}

function* stateSettingsGetProfileSaga({
  requestId,
}: StateSettingsGetProfileRequestAction): SagaGenerator<void> {
  try {
    const { data: profile, status: statusCode } = yield* call(
      stateSettingsGetProfileService,
    );

    const normalizedNodeUsers = yield* call(normalizeUsersPublicDtoArray, [
      profile,
    ]);

    yield* all([
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateSettingsGetProfileFailAction(message, requestId));
  }
}

function* stateSettingsUpdateProfileSaga({
  requestMetadata,
  requestId,
}: StateSettingsUpdateProfileRequestAction): SagaGenerator<void> {
  const { usersUpdateOnePartialDto } = requestMetadata;

  try {
    const { data: profile, status: statusCode } = yield* call(
      stateSettingsUpdateProfileService,
      usersUpdateOnePartialDto,
    );

    const normalizedNodeUsers = yield* call(normalizeUsersPublicDtoArray, [
      profile,
    ]);

    yield* all([
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateSettingsUpdateProfileFailAction(message, requestId));
  }
}

function* stateSettingsResetPasswordSaga({
  requestId,
}: StateSettingsResetPasswordRequestAction): SagaGenerator<void> {
  try {
    const { status: statusCode } = yield* call(
      stateSettingsResetPasswordService,
    );

    yield* put(
      createStateSettingsResetPasswordSuccessAction(requestId, statusCode),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateSettingsResetPasswordFailAction(message, requestId));
  }
}

function* stateSettingsSignoutSaga({
  requestId,
}: StateSettingsSignoutRequestAction): SagaGenerator<void> {
  try {
    yield* all([
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
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createStateSettingsSignoutFailAction(message, requestId));
  }
}

export function* stateSettingsSagas(): SagaGenerator<void> {
  yield* all([
    takeEvery(
      StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
      stateSettingsUpdatePartialReducerMetadataSaga,
    ),
    takeLatest(
      StateSettingsActionTypes.STATE_SETTINGS__GET_PROFILE__REQUEST,
      stateSettingsGetProfileSaga,
    ),
    takeLatest(
      StateSettingsActionTypes.STATE_SETTINGS__UPDATE_PROFILE__REQUEST,
      stateSettingsUpdateProfileSaga,
    ),
    takeLatest(
      StateSettingsActionTypes.STATE_SETTINGS__RESET_PASSWORD__REQUEST,
      stateSettingsResetPasswordSaga,
    ),
    takeLatest(
      StateSettingsActionTypes.STATE_SETTINGS__SIGNOUT__REQUEST,
      stateSettingsSignoutSaga,
    ),
  ]);
}
