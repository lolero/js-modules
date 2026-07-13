import type { SagaGenerator } from 'typed-redux-saga';
import { all, call, put, takeEvery, takeLatest } from 'typed-redux-saga';
import {
  createNodeTransactionsGetManyFailAction,
  createNodeTransactionsGetManySuccessAction,
  createNodeTransactionsGetOneFailAction,
  createNodeTransactionsGetOneSuccessAction,
} from './nodeTransactions.actions.creators';
import type {
  NodeTransactionsGetManyRequestAction,
  NodeTransactionsGetOneRequestAction,
} from './nodeTransactions.actions.types';
import { NodeTransactionsActionTypes } from './nodeTransactions.actions.types';
import { normalizeNodeTransactionsRawArray } from './nodeTransactions.normalizer';
import {
  nodeTransactionsGetManyService,
  nodeTransactionsGetOneService,
} from './nodeTransactions.services';

function* nodeTransactionsGetManySaga({
  requestId,
}: NodeTransactionsGetManyRequestAction): SagaGenerator<void> {
  try {
    const { data: nodeTransactionsRawArray, status: statusCode } = yield* call(
      nodeTransactionsGetManyService,
    );

    const normalizedNodeTransactions = yield* call(
      normalizeNodeTransactionsRawArray,
      nodeTransactionsRawArray,
    );

    yield* put(
      createNodeTransactionsGetManySuccessAction(
        normalizedNodeTransactions,
        requestId,
        statusCode,
        true,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeTransactionsGetManyFailAction(message, requestId));
  }
}

function* nodeTransactionsGetOneSaga({
  requestMetadata,
  requestId,
}: NodeTransactionsGetOneRequestAction): SagaGenerator<void> {
  try {
    const nodeTransactionPk = requestMetadata.uniqueKeyValue as string;

    const { data: nodeTransactionRaw, status: statusCode } = yield* call(
      nodeTransactionsGetOneService,
      nodeTransactionPk,
    );

    const normalizedNodeTransactions = yield* call(
      normalizeNodeTransactionsRawArray,
      [nodeTransactionRaw],
    );

    yield* put(
      createNodeTransactionsGetOneSuccessAction(
        normalizedNodeTransactions,
        requestId,
        statusCode,
      ),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    yield* put(createNodeTransactionsGetOneFailAction(message, requestId));
  }
}

export function* nodeTransactionsSagas(): SagaGenerator<void> {
  yield* all([
    takeLatest(
      NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__REQUEST,
      nodeTransactionsGetManySaga,
    ),
    takeEvery(
      NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__REQUEST,
      nodeTransactionsGetOneSaga,
    ),
  ]);
}
