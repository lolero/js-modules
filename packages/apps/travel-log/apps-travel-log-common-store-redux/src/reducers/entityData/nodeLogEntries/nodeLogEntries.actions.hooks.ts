import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type {
  Request,
  UseCallback,
  UseRequestEntities,
  UseRequestEntity,
  UseRequestReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  createNodeLogEntriesClearReducerRequestsAction,
  createNodeLogEntriesCreateOneRequestAction,
  createNodeLogEntriesDeleteManyRequestAction,
  createNodeLogEntriesDeleteOneRequestAction,
  createNodeLogEntriesGetManyRequestAction,
  createNodeLogEntriesGetOneRequestAction,
  createNodeLogEntriesUpdateManyPartialWithPatternRequestAction,
  createNodeLogEntriesUpdateOnePartialRequestAction,
  createNodeLogEntriesUpdateOneWholeRequestAction,
  createNodeLogEntriesUpdatePartialReducerMetadataRequestAction,
} from './nodeLogEntries.actions.creators';
import type {
  NodeLogEntriesClearReducerRequestsAction,
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
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
} from './nodeLogEntries.actions.types';
import {
  useNodeLogEntriesEntities,
  useNodeLogEntriesEntity,
  useNodeLogEntriesReducerMetadata,
  useNodeLogEntriesRequest,
} from './nodeLogEntries.hooks';
import { getPkOfNodeLogEntry } from './nodeLogEntries.pkUtils';
import type {
  NodeLogEntriesReducer,
  NodeLogEntry,
} from './nodeLogEntries.types';

export function useNodeLogEntriesClearReducerRequests(): UseCallback<
  (requestIds: NodeLogEntriesClearReducerRequestsAction['requestIds']) => void
> {
  const dispatch = useDispatch();

  function callback(
    requestIds: NodeLogEntriesClearReducerRequestsAction['requestIds'],
  ): void {
    const action = createNodeLogEntriesClearReducerRequestsAction(requestIds);
    dispatch(action);
  }

  return {
    callback,
  };
}

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

  function callback(
    partialReducerMetadata: NodeLogEntriesUpdatePartialReducerMetadataRequestAction['requestMetadata']['partialReducerMetadata'],
  ): void {
    const action =
      createNodeLogEntriesUpdatePartialReducerMetadataRequestAction(
        partialReducerMetadata,
      );
    setRequestId(action.requestId);
    dispatch(action);
  }

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

  function callback(
    nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['entity'],
  ): void {
    const action = createNodeLogEntriesCreateOneRequestAction(nodeLogEntry);
    dispatch(action);
  }

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

  function callback(
    uniqueKeyValue: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyValue'],
    uniqueKeyName: NodeLogEntriesGetOneRequestAction['requestMetadata']['uniqueKeyName'] = 'id',
  ): void {
    const action = createNodeLogEntriesGetOneRequestAction(
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

  function callback(
    findManyDto: NodeLogEntriesGetManyRequestAction['requestMetadata']['findManyDto'] = {},
  ): void {
    const action = createNodeLogEntriesGetManyRequestAction(findManyDto);
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

  function callback(
    nodeLogEntry: NodeLogEntriesUpdateOneWholeRequestAction['requestMetadata']['entity'],
  ): void {
    const action =
      createNodeLogEntriesUpdateOneWholeRequestAction(nodeLogEntry);
    const nodeLogEntryPk = getPkOfNodeLogEntry(nodeLogEntry);
    setEntityPk(nodeLogEntryPk);
    dispatch(action);
  }

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

  function callback(
    nodeLogEntryPk: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['entityPk'],
    partialEntity: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['partialEntity'],
  ): void {
    const action = createNodeLogEntriesUpdateOnePartialRequestAction(
      nodeLogEntryPk,
      partialEntity,
    );
    setEntityPk(nodeLogEntryPk);
    dispatch(action);
  }

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

  function callback(
    nodeLogEntryPks: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['entityPks'],
    partialEntity: NodeLogEntriesUpdateManyPartialWithPatternRequestAction['requestMetadata']['partialEntity'],
  ): void {
    const action =
      createNodeLogEntriesUpdateManyPartialWithPatternRequestAction(
        nodeLogEntryPks,
        partialEntity,
      );
    setEntityPks(nodeLogEntryPks);
    dispatch(action);
  }

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

  function callback(
    nodeLogEntryPk: NodeLogEntriesDeleteOneRequestAction['requestMetadata']['entityPk'],
  ): void {
    const action = createNodeLogEntriesDeleteOneRequestAction(nodeLogEntryPk);
    setEntityPk(nodeLogEntryPk);
    dispatch(action);
  }

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

  function callback(
    nodeLogEntryPks: NodeLogEntriesDeleteManyRequestAction['requestMetadata']['entityPks'],
  ): void {
    const action = createNodeLogEntriesDeleteManyRequestAction(nodeLogEntryPks);
    setEntityPks(nodeLogEntryPks);
    dispatch(action);
  }

  return {
    request,
    reducerMetadata,
    entities,
    callback,
  };
}
