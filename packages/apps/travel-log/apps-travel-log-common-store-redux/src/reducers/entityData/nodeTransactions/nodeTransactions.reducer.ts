import {
  handleFail,
  handleRequest,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeTransactionsReducer } from './nodeTransactions.types';
import { nodeTransactionsInitialState } from './nodeTransactions.initialState';
import {
  NodeTransactionsActionTypes,
  NodeTransactionsReducerHittingAction,
} from './nodeTransactions.actionsTypes';

export function nodeTransactionsReducer(
  // eslint-disable-next-line default-param-last
  state: NodeTransactionsReducer = nodeTransactionsInitialState,
  action: NodeTransactionsReducerHittingAction,
): NodeTransactionsReducer {
  switch (action.type) {
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS_GET_ONE__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
