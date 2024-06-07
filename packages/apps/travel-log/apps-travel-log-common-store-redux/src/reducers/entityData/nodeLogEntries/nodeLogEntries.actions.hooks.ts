import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  Request,
  UseRequestEntities,
  UseRequestEntity,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
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
import { NodeLogEntriesReducer, NodeLogEntry } from './nodeLogEntries.types';
import {
  useNodeLogEntriesEntities,
  useNodeLogEntriesEntity,
  useNodeLogEntriesReducerMetadata,
  useNodeLogEntriesRequest,
} from './nodeLogEntries.hooks';
import {
  createNodeLogEntriesCreateOneRequestAction,
  createNodeLogEntriesDeleteManyRequestAction,
  createNodeLogEntriesDeleteOneRequestAction,
  createNodeLogEntriesGetManyRequestAction,
  createNodeLogEntriesGetOneRequestAction,
  createNodeLogEntriesUpdateManyPartialWithPatternRequestAction,
  createNodeLogEntriesUpdateOnePartialRequestAction,
  createNodeLogEntriesUpdateOneWholeRequestAction,
  createNodeLogEntriesUpdatePartialReducerMetadataRequestAction,
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
} from './nodeLogEntries.actions.creators';
import { getPkOfNodeLogEntry } from './nodeLogEntries.pkUtils';

export function useNodeLogEntriesUpdatePartialReducerMetadata(): UseRequestReducerMetadata<
  NodeLogEntriesUpdatePartialReducerMetadataRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  (
    partialReducerMetadata: NodeLogEntriesUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeLogEntriesRequest(requestId) as Request<
    NodeLogEntriesUpdatePartialReducerMetadataRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();

  const callback = useCallback(
    (
      partialReducerMetadata: NodeLogEntriesUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
    ) => {
      const action =
        createNodeLogEntriesUpdatePartialReducerMetadataRequestAction(
          partialReducerMetadata,
        );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch],
  );

  return {
    request,
    reducerMetadata,
    callback,
  };
}

export function useNodeLogEntriesCreateOne(): UseRequestEntity<
  NodeLogEntriesCreateOneRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['entity'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useNodeLogEntriesRequest(
    NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  ) as Request<NodeLogEntriesCreateOneRequestAction['requestMetadata']>;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const entityPk = request?.entityPks?.[0];
  const entity = useNodeLogEntriesEntity(entityPk ?? '');

  const callback = useCallback(
    (
      nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['entity'],
    ) => {
      const action = createNodeLogEntriesCreateOneRequestAction(nodeLogEntry);
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

export function useNodeLogEntriesGetOne(): UseRequestEntity<
  NodeLogEntriesGetOneRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    uniqueKeyValue: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
    uniqueKeyName?: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyName'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeLogEntriesRequest(requestId) as Request<
    NodeLogEntriesGetOneRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const nodeLogEntryPk = request?.entityPks?.[0];
  const entity = useNodeLogEntriesEntity(nodeLogEntryPk ?? '');

  const callback = useCallback(
    (
      uniqueKeyValue: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
      uniqueKeyName: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
    ) => {
      const action = createNodeLogEntriesGetOneRequestAction(
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

export function useNodeLogEntriesGetMany(): UseRequestEntities<
  NodeLogEntriesGetManyRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    findManyDto?: NodeLogEntriesGetManyRequestAction['requestMetadata']['findManyDto'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeLogEntriesRequest(requestId) as Request<
    NodeLogEntriesGetManyRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const entityPks = request?.entityPks;
  const entities = useNodeLogEntriesEntities(entityPks ?? []);

  const callback = useCallback(
    (
      findManyDto: NodeLogEntriesGetManyRequestAction['requestMetadata']['findManyDto'] = {},
    ) => {
      const action = createNodeLogEntriesGetManyRequestAction(findManyDto);
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

export function useNodeLogEntriesUpdateOneWhole(): UseRequestEntity<
  NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntry: NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata']['entity'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useNodeLogEntriesRequest(
    NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
  ) as Request<NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata']>;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const [entityPk, setEntityPk] = useState('');
  const entity = useNodeLogEntriesEntity(entityPk);

  const callback = useCallback(
    (
      nodeLogEntry: NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata']['entity'],
    ) => {
      const action =
        createNodeLogEntriesUpdateOneWholeRequestAction(nodeLogEntry);
      const nodeLogEntryPk = getPkOfNodeLogEntry(nodeLogEntry);
      setEntityPk(nodeLogEntryPk);
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

export function useNodeLogEntriesUpdateOnePartial(): UseRequestEntity<
  NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntryPk: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['entityPk'],
    partialEntity: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['partialEntity'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useNodeLogEntriesRequest(
    NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
  ) as Request<NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']>;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const [entityPk, setEntityPk] = useState('');
  const entity = useNodeLogEntriesEntity(entityPk);

  const callback = useCallback(
    (
      nodeLogEntryPk: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['entityPk'],
      partialEntity: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['partialEntity'],
    ) => {
      const action = createNodeLogEntriesUpdateOnePartialRequestAction(
        nodeLogEntryPk,
        partialEntity,
      );
      setEntityPk(nodeLogEntryPk);
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

export function useNodeLogEntriesUpdateManyPartialWithPattern(): UseRequestEntities<
  NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntryPks: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['entityPks'],
    partialEntity: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['partialEntity'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useNodeLogEntriesRequest(
    NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
  ) as Request<
    NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const [entityPks, setEntityPks] = useState<string[]>([]);
  const entities = useNodeLogEntriesEntities(entityPks ?? []);

  const callback = useCallback(
    (
      nodeLogEntryPks: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['entityPks'],
      partialEntity: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['partialEntity'],
    ) => {
      const action =
        createNodeLogEntriesUpdateManyPartialWithPatternRequestAction(
          nodeLogEntryPks,
          partialEntity,
        );
      setEntityPks(nodeLogEntryPks);
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

export function useNodeLogEntriesDeleteOne(): UseRequestEntity<
  NodeLogEntriesDeleteOneRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntryPk: NodeLogEntriesDeleteOneRequestAction['requestMetadata']['entityPk'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useNodeLogEntriesRequest(
    NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
  ) as Request<NodeLogEntriesDeleteOneRequestAction['requestMetadata']>;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const [entityPk, setEntityPk] = useState('');
  const entity = useNodeLogEntriesEntity(entityPk);

  const callback = useCallback(
    (
      nodeLogEntryPk: NodeLogEntriesDeleteOneRequestAction['requestMetadata']['entityPk'],
    ) => {
      const action = createNodeLogEntriesDeleteOneRequestAction(nodeLogEntryPk);
      setEntityPk(nodeLogEntryPk);
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

export function useNodeLogEntriesDeleteMany(): UseRequestEntities<
  NodeLogEntriesDeleteManyRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntryPks: NodeLogEntriesDeleteManyRequestAction['requestMetadata']['entityPks'],
  ) => void
> {
  const dispatch = useDispatch();
  const request = useNodeLogEntriesRequest(
    NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  ) as Request<NodeLogEntriesDeleteManyRequestAction['requestMetadata']>;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const [entityPks, setEntityPks] = useState<string[]>([]);
  const entities = useNodeLogEntriesEntities(entityPks);

  const callback = useCallback(
    (
      nodeLogEntryPks: NodeLogEntriesDeleteManyRequestAction['requestMetadata']['entityPks'],
    ) => {
      const action =
        createNodeLogEntriesDeleteManyRequestAction(nodeLogEntryPks);
      setEntityPks(nodeLogEntryPks);
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
