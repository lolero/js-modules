import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type {
  Request,
  UseRequestEntities,
  UseRequestEntity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  createNodeUsersGetManyRequestAction,
  createNodeUsersGetOneRequestAction,
} from './nodeUsers.actions.creators';
import type {
  NodeUsersGetManyRequestAction,
  NodeUsersGetOneRequestAction,
} from './nodeUsers.actions.types';
import {
  useNodeUsersEntities,
  useNodeUsersEntity,
  useNodeUsersReducerMetadata,
  useNodeUsersRequest,
} from './nodeUsers.hooks';
import type { NodeUser, NodeUsersReducer } from './nodeUsers.types';

export function useNodeUsersGetOne(): UseRequestEntity<
  NodeUsersGetOneRequestAction['requestMetadata'],
  NodeUsersReducer['metadata'],
  NodeUser,
  (
    uniqueKeyValue: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
    uniqueKeyName?: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyName'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeUsersRequest(requestId) as Request<
    NodeUsersGetOneRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeUsersReducerMetadata();
  const nodeUserPk = request?.entityPks?.[0];
  const entity = useNodeUsersEntity(nodeUserPk ?? '');

  function callback(
    uniqueKeyValue: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
    uniqueKeyName: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
  ): void {
    const action = createNodeUsersGetOneRequestAction(
      uniqueKeyValue,
      uniqueKeyName,
    );
    setRequestId(action.requestId);
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    entity,
    callback,
  };
}

export function useNodeUsersGetMany(): UseRequestEntities<
  NodeUsersGetManyRequestAction['requestMetadata'],
  NodeUsersReducer['metadata'],
  NodeUser,
  () => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeUsersRequest(requestId) as Request<
    NodeUsersGetManyRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeUsersReducerMetadata();
  const entityPks = request?.entityPks;
  const entities = useNodeUsersEntities(entityPks ?? []);

  function callback(): void {
    const action = createNodeUsersGetManyRequestAction();
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
