import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import values from 'lodash/values';
import isEmpty from 'lodash/isEmpty';
import { nodeLogEntriesSelectors } from './nodeLogEntries.selectors';
import {
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
} from './nodeLogEntries.actions.creators';

export const nodeLogEntriesHooks = createReducerHooks(nodeLogEntriesSelectors);

export const {
  useRequest: useNodeLogEntriesRequest,
  useRequests: useNodeLogEntriesRequests,
  useReducerMetadata: useNodeLogEntriesReducerMetadata,
  useEntity: useNodeLogEntriesEntity,
  useEntities: useNodeLogEntriesEntities,
  useReducerConfig: useNodeLogEntriesReducerConfig,
} = nodeLogEntriesHooks;

export function useNodeLogEntriesIsMutationPendingOrCompleted(): boolean {
  const requests = useNodeLogEntriesRequests([
    NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
    NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
    NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID,
    NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID,
    NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID,
    NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID,
  ]);

  const isMutationPendingOrCompleted =
    !isEmpty(requests) &&
    values(requests).every(
      (request) => !!request?.isPending || !!request?.isOk,
    );

  return isMutationPendingOrCompleted;
}
