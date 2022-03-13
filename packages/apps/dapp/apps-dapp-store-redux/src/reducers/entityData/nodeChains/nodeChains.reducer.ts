import {
  handleFail,
  handleRequest,
  handleSaveWholeEntities,
} from 'normalized-reducers-utils';
import { NodeChainsReducer } from './nodeChains.types';
import { nodeChainsInitialState } from './nodeChains.initialState';
import {
  NodeChainsActionTypes,
  NodeChainsReducerHittingAction,
} from './nodeChains.actionsTypes';

function nodeChainsReducer(
  // eslint-disable-next-line default-param-last
  state: NodeChainsReducer = nodeChainsInitialState,
  action: NodeChainsReducerHittingAction,
): NodeChainsReducer {
  switch (action.type) {
    case NodeChainsActionTypes.NODE_CHAINS_GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeChainsActionTypes.NODE_CHAINS_GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeChainsActionTypes.NODE_CHAINS_GET_MANY__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}

export default nodeChainsReducer;
