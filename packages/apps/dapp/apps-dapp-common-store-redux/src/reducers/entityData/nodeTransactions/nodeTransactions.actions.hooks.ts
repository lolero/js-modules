import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type {
  Request,
  UseRequestEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  createNodeTransactionsGetManyRequestAction,
  createNodeTransactionsGetOneRequestAction,
} from './nodeTransactions.actions.creators';
import type {
  NodeTransactionsGetManyRequestAction,
  NodeTransactionsGetOneRequestAction,
} from './nodeTransactions.actions.types';
import {
  useNodeTransactionsEntities,
  useNodeTransactionsReducerMetadata,
  useNodeTransactionsRequest,
} from './nodeTransactions.hooks';
import type {
  NodeTransaction,
  NodeTransactionsReducer,
} from './nodeTransactions.types';

export function useNodeTransactionsGetMany(): UseRequestEntities<
  NodeTransactionsGetManyRequestAction['requestMetadata'],
  NodeTransactionsReducer['metadata'],
  NodeTransaction,
  () => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeTransactionsRequest(requestId) as Request<
    NodeTransactionsGetManyRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeTransactionsReducerMetadata();
  const entityPks = request?.entityPks;
  const entities = useNodeTransactionsEntities(entityPks ?? []);

  function callback(): void {
    const action = createNodeTransactionsGetManyRequestAction();
    setRequestId(action.requestId);
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    entities,
    callback,
  };
}

export function useNodeTransactionsGetOne(): UseRequestEntities<
  NodeTransactionsGetOneRequestAction['requestMetadata'],
  NodeTransactionsReducer['metadata'],
  NodeTransaction,
  (
    uniqueKeyValue: NodeTransactionsGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeTransactionsRequest(requestId) as Request<
    NodeTransactionsGetOneRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeTransactionsReducerMetadata();
  const entityPks = request?.entityPks;
  const entities = useNodeTransactionsEntities(entityPks ?? []);

  function callback(
    uniqueKeyValue: NodeTransactionsGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
  ): void {
    const action = createNodeTransactionsGetOneRequestAction(uniqueKeyValue);
    setRequestId(action.requestId);
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    entities,
    callback,
  };
}
