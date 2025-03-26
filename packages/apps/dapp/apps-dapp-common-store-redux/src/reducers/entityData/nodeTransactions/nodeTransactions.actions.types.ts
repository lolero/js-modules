import {
  FailAction,
  GetManyEntitiesRequestMetadata,
  GetOneEntityRequestMetadata,
  RequestAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import {
  NodeTransaction,
  NodeTransactionsReducer,
} from './nodeTransactions.types';

export enum NodeTransactionsActionTypes {
  NODE_TRANSACTIONS__GET_MANY__REQUEST = 'NODE_TRANSACTIONS__GET_MANY__REQUEST',
  NODE_TRANSACTIONS__GET_MANY__SUCCESS = 'NODE_TRANSACTIONS__GET_MANY__SUCCESS',
  NODE_TRANSACTIONS__GET_MANY__FAIL = 'NODE_TRANSACTIONS__GET_MANY__FAIL',
  NODE_TRANSACTIONS__GET_ONE__REQUEST = 'NODE_TRANSACTIONS__GET_ONE__REQUEST',
  NODE_TRANSACTIONS__GET_ONE__SUCCESS = 'NODE_TRANSACTIONS__GET_ONE__SUCCESS',
  NODE_TRANSACTIONS__GET_ONE__FAIL = 'NODE_TRANSACTIONS__GET_ONE__FAIL',
}

export type NodeTransactionsGetManyRequestAction = RequestAction<
  NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata<NodeTransaction, never>
>;

export type NodeTransactionsGetManySuccessAction = SaveWholeEntitiesAction<
  NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__SUCCESS,
  NodeTransactionsReducer['metadata'],
  NodeTransaction
>;

export type NodeTransactionsGetManyFailAction =
  FailAction<NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_MANY__FAIL>;

export type NodeTransactionsGetOneRequestAction = RequestAction<
  NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__REQUEST,
  GetOneEntityRequestMetadata<NodeTransaction, 'uid'>
>;

export type NodeTransactionsGetOneSuccessAction = SaveWholeEntitiesAction<
  NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__SUCCESS,
  NodeTransactionsReducer['metadata'],
  NodeTransaction
>;

export type NodeTransactionsGetOneFailAction =
  FailAction<NodeTransactionsActionTypes.NODE_TRANSACTIONS__GET_ONE__FAIL>;

export type NodeTransactionsReducerHittingAction =
  | NodeTransactionsGetManyRequestAction
  | NodeTransactionsGetManySuccessAction
  | NodeTransactionsGetManyFailAction
  | NodeTransactionsGetOneRequestAction
  | NodeTransactionsGetOneSuccessAction
  | NodeTransactionsGetOneFailAction;
