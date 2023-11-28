import {
  handleFail,
  handleRequest,
  handleSavePartialEntities,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeFormsReducer } from './nodeForms.types';
import { nodeFormsInitialState } from './nodeForms.initialState';
import {
  NodeFormsActionTypes,
  NodeFormsReducerHittingAction,
} from './nodeForms.actionsTypes';

export function nodeFormsReducer(
  // eslint-disable-next-line default-param-last
  state: NodeFormsReducer = nodeFormsInitialState,
  action: NodeFormsReducerHittingAction,
): NodeFormsReducer {
  switch (action.type) {
    case NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__REQUEST:
      return handleRequest(state, action);
    case NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__SUCCESS:
      return handleSavePartialEntities(state, action);
    case NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__FAIL:
      return handleFail(state, action);
    case NodeFormsActionTypes.NODE_FORMS__GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeFormsActionTypes.NODE_FORMS__GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeFormsActionTypes.NODE_FORMS__GET_ONE__FAIL:
      return handleFail(state, action);
    case NodeFormsActionTypes.NODE_FORMS__GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeFormsActionTypes.NODE_FORMS__GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeFormsActionTypes.NODE_FORMS__GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__SUCCESS:
      return handleSavePartialEntities(state, action);
    default:
      return state;
  }
}
