import {
  handleFail,
  handleRequest,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeChainsReducer } from './nodeChains.types';
import { nodeChainsInitialState } from './nodeChains.initialState';
import {
  NodeChainsActionTypes,
  NodeChainsReducerHittingAction,
} from './nodeChains.actions.types';

export function nodeChainsReducer(
  // eslint-disable-next-line default-param-last
  state: NodeChainsReducer = nodeChainsInitialState,
  action: NodeChainsReducerHittingAction,
): NodeChainsReducer {
  switch (action.type) {
    case NodeChainsActionTypes.NODE_CHAINS__GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeChainsActionTypes.NODE_CHAINS__GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeChainsActionTypes.NODE_CHAINS__GET_MANY__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
