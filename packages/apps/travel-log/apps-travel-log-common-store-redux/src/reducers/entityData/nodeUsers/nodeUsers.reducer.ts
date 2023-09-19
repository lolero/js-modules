import {
  handleFail,
  handleRequest,
  handleSavePartialEntities,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeUsersReducer } from './nodeUsers.types';
import { nodeUsersInitialState } from './nodeUsers.initialState';
import {
  NodeUsersActionTypes,
  NodeUsersReducerHittingAction,
} from './nodeUsers.actionsTypes';

export function nodeUsersReducer(
  // eslint-disable-next-line default-param-last
  state: NodeUsersReducer = nodeUsersInitialState,
  action: NodeUsersReducerHittingAction,
): NodeUsersReducer {
  switch (action.type) {
    case NodeUsersActionTypes.NODE_USERS__GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeUsersActionTypes.NODE_USERS__GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeUsersActionTypes.NODE_USERS__GET_ONE__FAIL:
      return handleFail(state, action);
    case NodeUsersActionTypes.NODE_USERS__GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeUsersActionTypes.NODE_USERS__GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeUsersActionTypes.NODE_USERS__GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeUsersActionTypes.NODE_USERS__UPDATE_ONE_PARTIAL__SUCCESS:
      return handleSavePartialEntities(state, action);
    default:
      return state;
  }
}
