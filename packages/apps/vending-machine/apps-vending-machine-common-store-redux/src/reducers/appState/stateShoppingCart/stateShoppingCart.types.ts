import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export interface StateShoppingCartReducerMetadata extends ReducerMetadata {
  pendingPurchases: Record<
    string,
    {
      quantity: number;
    }
  >;
}

export type StateShoppingCartReducer = Reducer<
  StateShoppingCartReducerMetadata,
  Entity
>;
