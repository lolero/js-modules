import {
  handleClearReducerRequests,
  handleDeleteEntities,
  handleFail,
  handleRequest,
  handleSavePartialReducerMetadata,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeLogEntriesReducer } from './nodeLogEntries.types';
import { nodeLogEntriesInitialState } from './nodeLogEntries.initialState';
import {
  NodeLogEntriesActionTypes,
  NodeLogEntriesReducerHittingAction,
} from './nodeLogEntries.actions.types';

export function nodeLogEntriesReducer(
  // eslint-disable-next-line default-param-last
  state: NodeLogEntriesReducer = nodeLogEntriesInitialState,
  action: NodeLogEntriesReducerHittingAction,
): NodeLogEntriesReducer {
  switch (action.type) {
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS:
      return handleClearReducerRequests(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
      return handleSavePartialReducerMetadata(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS:
      return handleDeleteEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__FAIL:
      return handleFail(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS:
      return handleDeleteEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
