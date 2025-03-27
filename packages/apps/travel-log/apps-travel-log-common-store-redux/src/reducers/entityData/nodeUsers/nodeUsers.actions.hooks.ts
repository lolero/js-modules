import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  Request,
  UseRequestEntities,
  UseRequestEntity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  NodeUsersGetManyRequestAction,
  NodeUsersGetOneRequestAction,
} from './nodeUsers.actions.types';
import { NodeUsersReducer, NodeUser } from './nodeUsers.types';
import {
  useNodeUsersEntities,
  useNodeUsersEntity,
  useNodeUsersReducerMetadata,
  useNodeUsersRequest,
} from './nodeUsers.hooks';
import {
  createNodeUsersGetManyRequestAction,
  createNodeUsersGetOneRequestAction,
} from './nodeUsers.actions.creators';

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

  const callback = useCallback(
    (
      uniqueKeyValue: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
      uniqueKeyName: NodeUsersGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
    ) => {
      const action = createNodeUsersGetOneRequestAction(
        uniqueKeyValue,
        uniqueKeyName,
      );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch],
  );

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

  const callback = useCallback(() => {
    const action = createNodeUsersGetManyRequestAction();
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
