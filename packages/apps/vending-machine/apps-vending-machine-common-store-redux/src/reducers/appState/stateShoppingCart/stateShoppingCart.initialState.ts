import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateShoppingCartReducer } from './stateShoppingCart.types';

const stateShoppingCartReducerMetadataInitialState: StateShoppingCartReducer['metadata'] =
  {
    pendingPurchases: {},
  };

const stateShoppingCartReducerDataInitialState: StateShoppingCartReducer['data'] =
  {};

export const stateShoppingCartInitialState = createInitialState<
  typeof stateShoppingCartReducerMetadataInitialState,
  Entity
>(
  stateShoppingCartReducerMetadataInitialState,
  stateShoppingCartReducerDataInitialState,
);
