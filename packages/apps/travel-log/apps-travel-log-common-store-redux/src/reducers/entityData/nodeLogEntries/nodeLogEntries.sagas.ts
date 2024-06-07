import {
  AllEffect,
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeLatest,
} from 'redux-saga/effects';
import { NodeLogEntriesReducer } from './nodeLogEntries.types';
import {
  NodeLogEntriesActionTypes,
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesGetManyRequestAction,
  NodeLogEntriesGetOneRequestAction,
  NodeLogEntriesUpdateOnePartialRequestAction,
} from './nodeLogEntries.actionsTypes';
import {
  createNodeLogEntriesCreateOneFailAction,
  createNodeLogEntriesCreateOneSuccessAction,
  createNodeLogEntriesGetManyFailAction,
  createNodeLogEntriesGetManySuccessAction,
  createNodeLogEntriesGetOneFailAction,
  createNodeLogEntriesGetOneSuccessAction,
  createNodeLogEntriesUpdateOnePartialFailAction,
  createNodeLogEntriesUpdateOnePartialSuccessAction,
} from './nodeLogEntries.actionsCreators';
import {
  NodeLogEntriesCreateOneServiceResponse,
  NodeLogEntriesGetManyServiceResponse,
  NodeLogEntriesGetOneServiceResponse,
} from './nodeLogEntries.servicesTypes';
import {
  nodeLogEntriesCreateOneService,
  nodeLogEntriesGetManyService,
  nodeLogEntriesGetOneService,
} from './nodeLogEntries.services';
import { normalizeLogEntriesDtoArray } from './nodeLogEntries.normalizer';

export function* nodeLogEntriesCreateOneSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesCreateOneRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeLogEntriesCreateOneServiceResponse | NodeLogEntriesReducer['data']
> {
  const { nodeLogEntry } = requestMetadata;

  try {
    const { data: nodeLogEntriesDto, status: statusCode } = (yield call(
      nodeLogEntriesCreateOneService,
      nodeLogEntry,
    )) as NodeLogEntriesCreateOneServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      nodeLogEntriesDto,
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
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeLogEntriesGetOneServiceResponse | NodeLogEntriesReducer['data']
> {
  const { uniqueKeyValue, uniqueKeyName } = requestMetadata;

  try {
    const { data: usersPublicDto, status: statusCode } = (yield call(
      nodeLogEntriesGetOneService,
      uniqueKeyValue,
      uniqueKeyName,
    )) as NodeLogEntriesGetOneServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      usersPublicDto,
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
  requestId,
}: NodeLogEntriesGetManyRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeLogEntriesGetManyServiceResponse | NodeLogEntriesReducer['data']
> {
  try {
    const { data: usersPublicDtoArray, status: statusCode } = (yield call(
      nodeLogEntriesGetManyService,
    )) as NodeLogEntriesGetManyServiceResponse;

    const normalizedNodeLogEntries = (yield call(
      normalizeLogEntriesDtoArray,
      usersPublicDtoArray,
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

export function* nodeLogEntriesUpdateOnePartialSaga({
  requestMetadata,
  requestId,
}: NodeLogEntriesUpdateOnePartialRequestAction): Generator<
  CallEffect | AllEffect<CallEffect> | PutEffect,
  void,
  NodeLogEntriesUpdateOnePartialServiceResponse | NodeLogEntriesReducer['data']
> {
  const { nodeLogEntryPk, nodeLogEntryPartial } = requestMetadata;

  try {
    const { data: usersPublicDto, status: statusCode } = (yield call(
      nodeLogEntriesUpdateOnePartialService,
      uniqueKeyValue,
      uniqueKeyName,
    )) as NodeLogEntriesUpdateOnePartialServiceResponse;

    const normalizedNodeLogEntries = (yield call(normalizeLogEntriesDtoArray, [
      usersPublicDto,
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

export function* nodeLogEntriesSagas(): Generator<ForkEffect, void, void> {
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
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
    nodeLogEntriesUpdateOnePartialSaga,
  );
}
