import {
  createReducerHooks,
  Request,
  UseRequestEntity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { useDispatch } from 'react-redux';
import { useCallback, useState } from 'react';
import {
  NodeLogEntriesCreateOneRequestAction,
  NodeLogEntriesUpdateOnePartialRequestAction,
} from './nodeLogEntries.actionsTypes';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';
import {
  createNodeLogEntriesCreateOneRequestAction,
  createNodeLogEntriesUpdateOnePartialRequestAction,
} from './nodeLogEntries.actionsCreators';
import { nodeLogEntriesSelectors } from './nodeLogEntries.selectors';

export const nodeLogEntriesHooks = createReducerHooks(nodeLogEntriesSelectors);

export const {
  useRequest: useNodeLogEntriesRequest,
  useRequests: useNodeLogEntriesRequests,
  useReducerMetadata: useNodeLogEntriesReducerMetadata,
  useEntity: useNodeLogEntriesEntity,
  useEntities: useNodeLogEntriesEntities,
  useReducerConfig: useNodeLogEntriesReducerConfig,
} = nodeLogEntriesHooks;

export function useNodeLogEntriesCreateOne(): UseRequestEntity<
  NodeLogEntriesCreateOneRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['nodeLogEntry'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeLogEntriesRequest(requestId) as Request<
    NodeLogEntriesCreateOneRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const nodeLogEntryPk = request?.entityPks?.[0];
  const entity = useNodeLogEntriesEntity(nodeLogEntryPk ?? '');

  const callback = useCallback(
    (
      nodeLogEntry: NodeLogEntriesCreateOneRequestAction['requestMetadata']['nodeLogEntry'],
    ) => {
      const action = createNodeLogEntriesCreateOneRequestAction(nodeLogEntry);
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

export function useNodeLogEntriesUpdateOnePartial(
  nodeLogEntryPk: string,
): UseRequestEntity<
  NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata'],
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry,
  (
    nodeLogEntryPartial: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['nodeLogEntryPartial'],
  ) => void
> {
  const dispatch = useDispatch();
  const [requestId, setRequestId] = useState('');
  const request = useNodeLogEntriesRequest(requestId) as Request<
    NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']
  >;
  const reducerMetadata = useNodeLogEntriesReducerMetadata();
  const entity = useNodeLogEntriesEntity(nodeLogEntryPk);

  const callback = useCallback(
    (
      nodeLogEntryPartial: NodeLogEntriesUpdateOnePartialRequestAction['requestMetadata']['nodeLogEntryPartial'],
    ) => {
      const action = createNodeLogEntriesUpdateOnePartialRequestAction(
        nodeLogEntryPk,
        nodeLogEntryPartial,
      );
      setRequestId(action.requestId);
      dispatch(action);
    },
    [dispatch, nodeLogEntryPk],
  );

  return {
    request,
    reducerMetadata,
    entity,
    callback,
  };
}
