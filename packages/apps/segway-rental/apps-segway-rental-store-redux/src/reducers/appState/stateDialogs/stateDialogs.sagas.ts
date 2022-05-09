import { ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import {
  StateDialogsActionTypes,
  StateDialogsUpdatePartialReducerMetadataRequestAction,
  StateDialogsUpdateWholeReducerMetadataRequestAction,
} from './stateDialogs.actionsTypes';
import {
  createStateDialogsUpdatePartialReducerMetadataFailAction,
  createStateDialogsUpdatePartialReducerMetadataSuccessAction,
  createStateDialogsUpdateWholeReducerMetadataFailAction,
  createStateDialogsUpdateWholeReducerMetadataSuccessAction,
} from './stateDialogs.actionsCreators';

export function* stateDialogsUpdateWholeReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateDialogsUpdateWholeReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { wholeReducerMetadata } = requestMetadata;

    yield put(
      createStateDialogsUpdateWholeReducerMetadataSuccessAction(
        wholeReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateDialogsUpdateWholeReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateDialogsUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateDialogsUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateDialogsUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateDialogsUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateDialogsSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateDialogsActionTypes.STATE_DIALOGS_UPDATE_WHOLE_REDUCER_METADATA_REQUEST,
    stateDialogsUpdateWholeReducerMetadataSaga,
  );
  yield takeEvery(
    StateDialogsActionTypes.STATE_DIALOGS_UPDATE_PARTIAL_REDUCER_METADATA_REQUEST,
    stateDialogsUpdatePartialReducerMetadataSaga,
  );
}
