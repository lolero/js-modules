import {
  Request,
  UseRequestEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  NodeTransactionsGetManyRequestAction,
  NodeTransactionsGetOneRequestAction,
} from './nodeTransactions.actions.types';
import {
  NodeTransaction,
  NodeTransactionsReducer,
} from './nodeTransactions.types';
import {
  useNodeTransactionsEntities,
  useNodeTransactionsReducerMetadata,
  useNodeTransactionsRequest,
} from './nodeTransactions.hooks';
import {
  createNodeTransactionsGetManyRequestAction,
  createNodeTransactionsGetOneRequestAction,
} from './nodeTransactions.actions.creators';

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

  const callback = useCallback(() => {
    const action = createNodeTransactionsGetManyRequestAction();
    setRequestId(action.requestId);
    dispatch(action);
  }, [dispatch]);

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

  const callback = useCallback(
    (
      uniqueKeyValue: NodeTransactionsGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
    ) => {
      const action = createNodeTransactionsGetOneRequestAction(uniqueKeyValue);
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch],
  );

  return {
    request,
    reducerMetadata,
    entities,
    callback,
  };
}
