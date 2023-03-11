import {
  handleDeleteEntities,
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

function nodeUsersReducer(
  // eslint-disable-next-line default-param-last
  state: NodeUsersReducer = nodeUsersInitialState,
  action: NodeUsersReducerHittingAction,
): NodeUsersReducer {
  switch (action.type) {
    case NodeUsersActionTypes.NODE_USERS_GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeUsersActionTypes.NODE_USERS_GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeUsersActionTypes.NODE_USERS_GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeUsersActionTypes.NODE_USERS_GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeUsersActionTypes.NODE_USERS_GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeUsersActionTypes.NODE_USERS_GET_ONE__FAIL:
      return handleFail(state, action);
    case NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__REQUEST:
      return handleRequest(state, action);
    case NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__SUCCESS:
      return handleSavePartialEntities(state, action);
    case NodeUsersActionTypes.NODE_USERS_UPDATE_ONE_ROLE__FAIL:
      return handleFail(state, action);
    case NodeUsersActionTypes.NODE_USERS_DELETE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeUsersActionTypes.NODE_USERS_DELETE_ONE__SUCCESS:
      return handleDeleteEntities(state, action);
    case NodeUsersActionTypes.NODE_USERS_DELETE_ONE__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}

export default nodeUsersReducer;
