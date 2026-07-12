import type {
  FailAction,
  GetManyEntitiesRequestMetadata,
  GetOneEntityRequestMetadata,
  RequestAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';
import type {
  NodeTransaction,
  NodeTransactionsReducer,
} from './nodeTransactions.types';

export const NodeTransactionsActionTypes = {
  NODE_TRANSACTIONS__GET_MANY__REQUEST: 'NODE_TRANSACTIONS__GET_MANY__REQUEST',
  NODE_TRANSACTIONS__GET_MANY__SUCCESS: 'NODE_TRANSACTIONS__GET_MANY__SUCCESS',
  NODE_TRANSACTIONS__GET_MANY__FAIL: 'NODE_TRANSACTIONS__GET_MANY__FAIL',
  NODE_TRANSACTIONS__GET_ONE__REQUEST: 'NODE_TRANSACTIONS__GET_ONE__REQUEST',
  NODE_TRANSACTIONS__GET_ONE__SUCCESS: 'NODE_TRANSACTIONS__GET_ONE__SUCCESS',
  NODE_TRANSACTIONS__GET_ONE__FAIL: 'NODE_TRANSACTIONS__GET_ONE__FAIL',
} as const;
export type NodeTransactionsActionTypes = Enum<
  typeof NodeTransactionsActionTypes
>;

export type NodeTransactionsGetManyRequestAction = RequestAction<
  typeof NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata<NodeTransaction, never>
>;

export type NodeTransactionsGetManySuccessAction = SaveWholeEntitiesAction<
  typeof NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__SUCCESS,
  NodeTransactionsReducer['metadata'],
  NodeTransaction
>;

export type NodeTransactionsGetManyFailAction = FailAction<
  typeof NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__FAIL
>;

export type NodeTransactionsGetOneRequestAction = RequestAction<
  typeof NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__REQUEST,
  GetOneEntityRequestMetadata<NodeTransaction, 'uid'>
>;

export type NodeTransactionsGetOneSuccessAction = SaveWholeEntitiesAction<
  typeof NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__SUCCESS,
  NodeTransactionsReducer['metadata'],
  NodeTransaction
>;

export type NodeTransactionsGetOneFailAction = FailAction<
  typeof NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__FAIL
>;

export type NodeTransactionsReducerHittingAction =
  | NodeTransactionsGetManyRequestAction
  | NodeTransactionsGetManySuccessAction
  | NodeTransactionsGetManyFailAction
  | NodeTransactionsGetOneRequestAction
  | NodeTransactionsGetOneSuccessAction
  | NodeTransactionsGetOneFailAction;
