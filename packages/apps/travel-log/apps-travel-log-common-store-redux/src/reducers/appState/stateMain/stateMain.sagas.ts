import { ForkEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import {
  StateMainActionTypes,
  StateMainUpdatePartialReducerMetadataRequestAction,
} from './stateMain.actionsTypes';
import {
  createStateMainUpdatePartialReducerMetadataFailAction,
  createStateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actionsCreators';

export function* stateMainUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateMainUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createStateMainUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createStateMainUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* stateMainSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    stateMainUpdatePartialReducerMetadataSaga,
  );
}
