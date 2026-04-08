import type { SagaGenerator } from 'typed-redux-saga';
import { all, call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import {
  createNodeLogEntriesCreateOneFailAction,
  createNodeLogEntriesCreateOneSuccessAction,
  createNodeLogEntriesDeleteManyFailAction,
  createNodeLogEntriesDeleteManySuccessAction,
  createNodeLogEntriesDeleteOneFailAction,
  createNodeLogEntriesDeleteOneSuccessAction,
  createNodeLogEntriesGetManyFailAction,
  createNodeLogEntriesGetManySuccessAction,
  createNodeLogEntriesGetOneFailAction,
  createNodeLogEntriesGetOneSuccessAction,
  createNodeLogEntriesUpdateManyPartialWithPatternFailAction,
  createNodeLogEntriesUpdateManyPartialWithPatternSuccessAction,
  createNodeLogEntriesUpdateOnePartialFailAction,
  createNodeLogEntriesUpdateOnePartialSuccessAction,
  createNodeLogEntriesUpdateOneWholeFailAction,
  createNodeLogEntriesUpdateOneWholeSuccessAction,
  createNodeLogEntriesUpdatePartialReducerMetadataFailAction,
  createNodeLogEntriesUpdatePartialReducerMetadataSuccessAction,
} from './nodeLogEntries.actions.creators';
import type {
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesDeleteManyRequestAction,
  NodeLogEntriesDeleteOneRequestAction,
  NodeLogEntriesGetManyRequestAction,
  NodeLogEntriesGetOneRequestAction,
  NodeLogEntriesUpdateManyPartialWithPatternRequestAction,
  NodeLogEntriesUpdateOnePartialRequestAction,
  NodeLogEntriesUpdateOneWholeRequestAction,
  NodeLogEntriesUpdatePartialReducerMetadataRequestAction,
} from './nodeLogEntries.actions.types';
import { NodeLogEntriesActionTypes } from './nodeLogEntries.actions.types';
import { normalizeLogEntriesDtoArray } from './nodeLogEntries.normalizer';
import {
  nodeLogEntriesCreateOneService,
  nodeLogEntriesDeleteManyService,
  nodeLogEntriesDeleteOneService,
  nodeLogEntriesGetManyService,
  nodeLogEntriesGetOneService,
  nodeLogEntriesUpdateManyPartialWithPatternService,
  nodeLogEntriesUpdateOnePartialService,
  nodeLogEntriesUpdateOneWholeService,
} from './nodeLogEntries.services';

export function* nodeLogEntriesUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdatePartialReducerMetadataRequestAction): SagaGenerator<void> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield* put(
      createNodeLogEntriesUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(
      createNodeLogEntriesUpdatePartialReducerMetadataFailAction(
        message,
        requestId,
      ),
    );
  }
}

export function* nodeLogEntriesCreateOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesCreateOneRequestAction): SagaGenerator<void> {
  const { entity } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = yield* call(
      nodeLogEntriesCreateOneService,
      entity,
    );

    const { reducerData: normalizedNodeLogEntries } = yield* call(
      normalizeLogEntriesDtoArray,
      [logEntriesDto],
    );

    yield* put(
      createNodeLogEntriesCreateOneSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeLogEntriesCreateOneFailAction(message, requestId));
  }
}

export function* nodeLogEntriesGetOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesGetOneRequestAction): SagaGenerator<void> {
  const { uniqueKeyValue, uniqueKeyName } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = yield* call(
      nodeLogEntriesGetOneService,
      uniqueKeyValue,
      uniqueKeyName,
    );

    const { reducerData: normalizedNodeLogEntries } = yield* call(
      normalizeLogEntriesDtoArray,
      [logEntriesDto],
    );

    yield* put(
      createNodeLogEntriesGetOneSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeLogEntriesGetOneFailAction(message, requestId));
  }
}

export function* nodeLogEntriesGetManySaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesGetManyRequestAction): SagaGenerator<void> {
  const { findManyDto } = requestMetadata;

  try {
    const {
      data: { entities: logEntriesDtoArray, total: getManyTotal },
      status: statusCode,
    } = yield* call(nodeLogEntriesGetManyService, findManyDto);

    const {
      reducerData: normalizedNodeLogEntries,
      entityPksSorted: getManyPksSorted,
    } = yield* call(normalizeLogEntriesDtoArray, logEntriesDtoArray);

    yield* put(
      createNodeLogEntriesGetManySuccessAction(
        normalizedNodeLogEntries,
        {
          getManyTotal,
          getManyPksSorted,
        },
        requestId,
        statusCode,
        true,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeLogEntriesGetManyFailAction(message, requestId));
  }
}

export function* nodeLogEntriesUpdateOneWholeSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateOneWholeRequestAction): SagaGenerator<void> {
  const { entity } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = yield* call(
      nodeLogEntriesUpdateOneWholeService,
      entity,
    );

    const { reducerData: normalizedNodeLogEntries } = yield* call(
      normalizeLogEntriesDtoArray,
      [logEntriesDto],
    );

    yield* put(
      createNodeLogEntriesUpdateOneWholeSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(
      createNodeLogEntriesUpdateOneWholeFailAction(message, requestId),
    );
  }
}

export function* nodeLogEntriesUpdateOnePartialSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateOnePartialRequestAction): SagaGenerator<void> {
  const { entityPk, partialEntity } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = yield* call(
      nodeLogEntriesUpdateOnePartialService,
      entityPk,
      partialEntity,
    );

    const { reducerData: normalizedNodeLogEntries } = yield* call(
      normalizeLogEntriesDtoArray,
      [logEntriesDto],
    );

    yield* put(
      createNodeLogEntriesUpdateOnePartialSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(
      createNodeLogEntriesUpdateOnePartialFailAction(message, requestId),
    );
  }
}

export function* nodeLogEntriesUpdateManyPartialWithPatternSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateManyPartialWithPatternRequestAction): SagaGenerator<void> {
  const { entityPks, partialEntity } = requestMetadata;

  try {
    const { data: logEntriesDtoArray, status: statusCode } = yield* call(
      nodeLogEntriesUpdateManyPartialWithPatternService,
      entityPks,
      partialEntity,
    );

    const { reducerData: normalizedNodeLogEntries } = yield* call(
      normalizeLogEntriesDtoArray,
      logEntriesDtoArray,
    );

    yield* put(
      createNodeLogEntriesUpdateManyPartialWithPatternSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(
      createNodeLogEntriesUpdateManyPartialWithPatternFailAction(
        message,
        requestId,
      ),
    );
  }
}

export function* nodeLogEntriesDeleteOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesDeleteOneRequestAction): SagaGenerator<void> {
  const { entityPk } = requestMetadata;

  try {
    const { status: statusCode } = yield* call(
      nodeLogEntriesDeleteOneService,
      entityPk,
    );

    yield* put(
      createNodeLogEntriesDeleteOneSuccessAction(
        [entityPk],
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeLogEntriesDeleteOneFailAction(message, requestId));
  }
}

export function* nodeLogEntriesDeleteManySaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesDeleteManyRequestAction): SagaGenerator<void> {
  const { entityPks } = requestMetadata;

  try {
    const { status: statusCode } = yield* call(
      nodeLogEntriesDeleteManyService,
      entityPks,
    );

    yield* put(
      createNodeLogEntriesDeleteManySuccessAction(
        entityPks,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeLogEntriesDeleteManyFailAction(message, requestId));
  }
}

export function* nodeLogEntriesSagas(): SagaGenerator<void> {
  yield* all([
    takeEvery(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
      nodeLogEntriesUpdatePartialReducerMetadataSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
      nodeLogEntriesCreateOneSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__REQUEST,
      nodeLogEntriesGetOneSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST,
      nodeLogEntriesGetManySaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST,
      nodeLogEntriesUpdateOneWholeSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
      nodeLogEntriesUpdateOnePartialSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST,
      nodeLogEntriesUpdateManyPartialWithPatternSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__REQUEST,
      nodeLogEntriesDeleteOneSaga,
    ),
    takeLatest(
      NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__REQUEST,
      nodeLogEntriesDeleteManySaga,
    ),
  ]);
}
