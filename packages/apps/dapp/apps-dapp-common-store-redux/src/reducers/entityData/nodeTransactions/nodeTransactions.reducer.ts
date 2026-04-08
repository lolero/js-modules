import {
  handleFail,
  handleRequest,
  handleSaveWholeEntities,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { NodeTransactionsReducerHittingAction } from './nodeTransactions.actions.types';
import { NodeTransactionsActionTypes } from './nodeTransactions.actions.types';
import { nodeTransactionsInitialState } from './nodeTransactions.initialState';
import type { NodeTransactionsReducer } from './nodeTransactions.types';

export function nodeTransactionsReducer(
  state: NodeTransactionsReducer = nodeTransactionsInitialState,
  action: NodeTransactionsReducerHittingAction,
): NodeTransactionsReducer {
  switch (action.type) {
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__REQUEST:
      return handleRequest(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__FAIL:
      return handleFail(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__REQUEST:
      return handleRequest(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__SUCCESS:
      return handleSaveWholeEntities(state, action);
    case NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__FAIL:
      return handleFail(state, action);
    default:
      return state;
  }
}
