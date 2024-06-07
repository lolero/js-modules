import {
  handleFail,
  handleRequest,
  handleSavePartialEntities,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeLogEntriesReducer } from './nodeLogEntries.types';
import { nodeLogEntriesInitialState } from './nodeLogEntries.initialState';
import {
  NodeLogEntriesActionTypes,
  NodeLogEntriesReducerHittingAction,
} from './nodeLogEntries.actionsTypes';

export function nodeLogEntriesReducer(
  // eslint-disable-next-line default-param-last
  state: NodeLogEntriesReducer = nodeLogEntriesInitialState,
  action: NodeLogEntriesReducerHittingAction,
): NodeLogEntriesReducer {
  switch (action.type) {
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
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST:
      return handleRequest(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS:
      return handleSavePartialEntities(state, action);
    case NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
