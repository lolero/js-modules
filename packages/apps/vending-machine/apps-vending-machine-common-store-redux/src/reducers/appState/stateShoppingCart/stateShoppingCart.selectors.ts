import {
  createReducerSelectors,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateShoppingCartReducer } from './stateShoppingCart.types';
import { ReduxState } from '../../reducers.types';
import { stateShoppingCartReducerPath } from './stateShoppingCart.reducerPath';

export const stateShoppingCartSelectors = createReducerSelectors<
  StateShoppingCartReducer['metadata'],
  Entity,
  typeof stateShoppingCartReducerPath,
  ReduxState
>(stateShoppingCartReducerPath);

export const {
  selectRequests: selectStateShoppingCartRequests,
  selectMetadata: selectStateShoppingCartMetadata,
  selectConfig: selectStateShoppingCartConfig,
} = stateShoppingCartSelectors;
