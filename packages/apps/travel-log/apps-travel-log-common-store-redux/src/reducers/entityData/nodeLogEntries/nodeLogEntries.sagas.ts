import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { NodeLogEntriesReducer } from './nodeLogEntries.types';
import {
  NodeLogEntriesActionTypes,
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
import {
  NodeLogEntriesCreateOneServiceResponse,
  NodeLogEntriesDeleteManyServiceResponse,
  NodeLogEntriesDeleteOneServiceResponse,
  NodeLogEntriesGetManyServiceResponse,
  NodeLogEntriesGetOneServiceResponse,
  NodeLogEntriesUpdateManyPartialWithPatternServiceResponse,
  NodeLogEntriesUpdateOnePartialServiceResponse,
  NodeLogEntriesUpdateOneWholeServiceResponse,
} from './nodeLogEntries.services.types';
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
import { normalizeLogEntriesDtoArray } from './nodeLogEntries.normalizer';

export function* nodeLogEntriesUpdatePartialReducerMetadataSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdatePartialReducerMetadataRequestAction): Generator<
  PutEffect,
  void,
  void
> {
  try {
    const { partialReducerMetadata } = requestMetadata;

    yield put(
      createNodeLogEntriesUpdatePartialReducerMetadataSuccessAction(
        partialReducerMetadata,
        requestId,
      ),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error(err.message);
    yield put(
      createNodeLogEntriesUpdatePartialReducerMetadataFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* nodeLogEntriesCreateOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesCreateOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesCreateOneServiceResponse | NodeLogEntriesReducer['data']
> {
  const { entity } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = (yield call(
      nodeLogEntriesCreateOneService,
      entity,
    )) as NodeLogEntriesCreateOneServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      logEntriesDto,
    ])) as NodeLogEntriesReducer['data'];

    yield put(
      createNodeLogEntriesCreateOneSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeLogEntriesCreateOneFailAction(err.message, requestId));
  }
}

export function* nodeLogEntriesGetOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesGetOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesGetOneServiceResponse | NodeLogEntriesReducer['data']
> {
  const { uniqueKeyValue, uniqueKeyName } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = (yield call(
      nodeLogEntriesGetOneService,
      uniqueKeyValue,
      uniqueKeyName,
    )) as NodeLogEntriesGetOneServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      logEntriesDto,
    ])) as NodeLogEntriesReducer['data'];

    yield put(
      createNodeLogEntriesGetOneSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeLogEntriesGetOneFailAction(err.message, requestId));
  }
}

export function* nodeLogEntriesGetManySaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesGetManyRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesGetManyServiceResponse | NodeLogEntriesReducer['data']
> {
  const { findManyDto } = requestMetadata;

  try {
    const { data: logEntriesDtoArray, status: statusCode } = (yield call(
      nodeLogEntriesGetManyService,
      findManyDto,
    )) as NodeLogEntriesGetManyServiceResponse;

    const normalizedNodeLogEntries = (yield call(
      normalizeLogEntriesDtoArray,
      logEntriesDtoArray,
    )) as NodeLogEntriesReducer['data'];

    yield put(
      createNodeLogEntriesGetManySuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
        true,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeLogEntriesGetManyFailAction(err.message, requestId));
  }
}

export function* nodeLogEntriesUpdateOneWholeSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateOneWholeRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesUpdateOneWholeServiceResponse | NodeLogEntriesReducer['data']
> {
  const { entity } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = (yield call(
      nodeLogEntriesUpdateOneWholeService,
      entity,
    )) as NodeLogEntriesUpdateOneWholeServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      logEntriesDto,
    ])) as NodeLogEntriesReducer['data'];

    yield put(
      createNodeLogEntriesUpdateOneWholeSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeLogEntriesUpdateOneWholeFailAction(err.message, requestId),
    );
  }
}

export function* nodeLogEntriesUpdateOnePartialSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateOnePartialRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesUpdateOnePartialServiceResponse | NodeLogEntriesReducer['data']
> {
  const { entityPk, partialEntity } = requestMetadata;

  try {
    const { data: logEntriesDto, status: statusCode } = (yield call(
      nodeLogEntriesUpdateOnePartialService,
      entityPk,
      partialEntity,
    )) as NodeLogEntriesUpdateOnePartialServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      logEntriesDto,
    ])) as NodeLogEntriesReducer['data'];

    yield put(
      createNodeLogEntriesUpdateOnePartialSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeLogEntriesUpdateOnePartialFailAction(err.message, requestId),
    );
  }
}

export function* nodeLogEntriesUpdateManyPartialWithPatternSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateManyPartialWithPatternRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  | NodeLogEntriesUpdateManyPartialWithPatternServiceResponse
  | NodeLogEntriesReducer['data']
> {
  const { entityPks, partialEntity } = requestMetadata;

  try {
    const { data: logEntriesDtoArray, status: statusCode } = (yield call(
      nodeLogEntriesUpdateManyPartialWithPatternService,
      entityPks,
      partialEntity,
    )) as NodeLogEntriesUpdateManyPartialWithPatternServiceResponse;

    const normalizedNodeLogEntries = (yield call(
      normalizeLogEntriesDtoArray,
      logEntriesDtoArray,
    )) as NodeLogEntriesReducer['data'];

    yield put(
      createNodeLogEntriesUpdateManyPartialWithPatternSuccessAction(
        normalizedNodeLogEntries,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(
      createNodeLogEntriesUpdateManyPartialWithPatternFailAction(
        err.message,
        requestId,
      ),
    );
  }
}

export function* nodeLogEntriesDeleteOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesDeleteOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesDeleteOneServiceResponse
> {
  const { entityPk } = requestMetadata;

  try {
    const { status: statusCode } = (yield call(
      nodeLogEntriesDeleteOneService,
      entityPk,
    )) as NodeLogEntriesDeleteOneServiceResponse;

    yield put(
      createNodeLogEntriesDeleteOneSuccessAction(
        [entityPk],
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeLogEntriesDeleteOneFailAction(err.message, requestId));
  }
}

export function* nodeLogEntriesDeleteManySaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesDeleteManyRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeLogEntriesDeleteManyServiceResponse
> {
  const { entityPks } = requestMetadata;

  try {
    const { status: statusCode } = (yield call(
      nodeLogEntriesDeleteManyService,
      entityPks,
    )) as NodeLogEntriesDeleteManyServiceResponse;

    yield put(
      createNodeLogEntriesDeleteManySuccessAction(
        entityPks,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeLogEntriesDeleteManyFailAction(err.message, requestId));
  }
}

export function* nodeLogEntriesSagas(): Generator<ForkEffect, void, void> {
  yield takeEvery(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    nodeLogEntriesUpdatePartialReducerMetadataSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
    nodeLogEntriesCreateOneSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__REQUEST,
    nodeLogEntriesGetOneSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST,
    nodeLogEntriesGetManySaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST,
    nodeLogEntriesUpdateOneWholeSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
    nodeLogEntriesUpdateOnePartialSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST,
    nodeLogEntriesUpdateManyPartialWithPatternSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__REQUEST,
    nodeLogEntriesDeleteOneSaga,
  );
  yield takeLatest(
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__REQUEST,
    nodeLogEntriesDeleteManySaga,
  );
}
