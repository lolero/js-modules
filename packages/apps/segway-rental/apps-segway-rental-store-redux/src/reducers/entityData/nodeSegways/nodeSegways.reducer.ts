import {
  handleDeleteEntities,
  handleFail,
  handleRequest,
  handleSaveNothing,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeSegwaysReducer } from './nodeSegways.types';
import { nodeSegwaysInitialState } from './nodeSegways.initialState';
import {
  NodeSegwaysActionTypes,
  NodeSegwaysReducerHittingAction,
} from './nodeSegways.actionsTypes';

function nodeSegwaysReducer(
  // eslint-disable-next-line default-param-last
  state: NodeSegwaysReducer = nodeSegwaysInitialState,
  action: NodeSegwaysReducerHittingAction,
): NodeSegwaysReducer {
  switch (action.type) {
    case NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__SUCCESS:
      return handleSaveNothing(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_CREATE_ONE__FAIL:
      return handleFail(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__REQUEST:
      return handleRequest(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__SUCCESS:
      return handleSaveNothing(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_UPDATE_ONE_WHOLE__FAIL:
      return handleFail(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__SUCCESS:
      return handleDeleteEntities(state, action);
    case NodeSegwaysActionTypes.NODE_SEGWAYS_DELETE_ONE__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}

export default nodeSegwaysReducer;
