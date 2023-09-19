import {
  call,
  CallEffect,
  ForkEffect,
  put,
  PutEffect,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import { NodeTransactionsReducer } from './nodeTransactions.types';
import {
  NodeTransactionsActionTypes,
  NodeTransactionsGetManyRequestAction,
  NodeTransactionsGetOneRequestAction,
} from './nodeTransactions.actionsTypes';
import {
  createNodeTransactionsGetManyFailAction,
  createNodeTransactionsGetManySuccessAction,
  createNodeTransactionsGetOneFailAction,
  createNodeTransactionsGetOneSuccessAction,
} from './nodeTransactions.actionsCreators';
import {
  NodeTransactionsGetManyServiceResponse,
  NodeTransactionsGetOneServiceResponse,
} from './nodeTransactions.servicesTypes';
import {
  nodeTransactionsGetManyService,
  nodeTransactionsGetOneService,
} from './nodeTransactions.services';
import { normalizeNodeTransactionsRawArray } from './nodeTransactions.normalizer';

export function* nodeTransactionsGetManySaga({
  requestId,
}: NodeTransactionsGetManyRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeTransactionsGetManyServiceResponse | NodeTransactionsReducer['data']
> {
  try {
    const { data: nodeTransactionsRawArray, status: statusCode } = (yield call(
      nodeTransactionsGetManyService,
    )) as NodeTransactionsGetManyServiceResponse;

    const normalizedNodeTransactions = (yield call(
      normalizeNodeTransactionsRawArray,
      nodeTransactionsRawArray,
    )) as NodeTransactionsReducer['data'];

    yield put(
      createNodeTransactionsGetManySuccessAction(
        normalizedNodeTransactions,
        requestId,
        statusCode,
        true,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeTransactionsGetManyFailAction(err.message, requestId));
  }
}

export function* nodeTransactionsGetOneSaga({
  requestMetadata,
  requestId,
}: NodeTransactionsGetOneRequestAction): Generator<
  CallEffect | PutEffect,
  void,
  NodeTransactionsGetOneServiceResponse | NodeTransactionsReducer['data']
> {
  try {
    const { entityPk: nodeTransactionPk } = requestMetadata;

    const { data: nodeTransactionRaw, status: statusCode } = (yield call(
      nodeTransactionsGetOneService,
      nodeTransactionPk,
    )) as NodeTransactionsGetOneServiceResponse;

    const normalizedNodeTransactions = (yield call(
      normalizeNodeTransactionsRawArray,
      [nodeTransactionRaw],
    )) as NodeTransactionsReducer['data'];

    yield put(
      createNodeTransactionsGetOneSuccessAction(
        normalizedNodeTransactions,
        requestId,
        statusCode,
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    yield put(createNodeTransactionsGetOneFailAction(err.message, requestId));
  }
}

export function* nodeTransactionsSagas(): Generator<ForkEffect, void, void> {
  yield takeLatest(
    NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__REQUEST,
    nodeTransactionsGetManySaga,
  );
  yield takeEvery(
    NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__REQUEST,
    nodeTransactionsGetOneSaga,
  );
}
