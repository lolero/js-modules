import type { SagaGenerator } from 'typed-redux-saga';
import { all, put, takeEvery } from 'typed-redux-saga';
import {
  createStateMainUpdatePartialReducerMetadataFailAction,
  createStateMainUpdatePartialReducerMetadataSuccessAction,
} from './stateMain.actions.creators';
import type { StateMainUpdatePartialReducerMetadataRequestAction } from './stateMain.actions.types';
import { StateMainActionTypes } from './stateMain.actions.types';

function* stateMainUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: StateMainUpdatePartialReducerMetadataRequestAction): SagaGenerator<void> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield* put(
      createStateMainUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(
      createStateMainUpdatePartialReducerMetadataFailAction(message, requestId),
    );
  }
}

export function* stateMainSagas(): SagaGenerator<void> {
  yield* all([
    takeEvery(
      StateMainActionTypes.STATE_MAIN__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
      stateMainUpdatePartialReducerMetadataSaga,
    ),
  ]);
}
