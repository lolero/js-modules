import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeProduct, NodeProductsReducer } from './nodeProducts.types';
import { ReduxState } from '../../reducers.types';
import { nodeProductsReducerPath } from './nodeProducts.reducerPath';

export const nodeProductsReducerSelectors = createReducerSelectors<
  NodeProductsReducer['metadata'],
  NodeProduct,
  typeof nodeProductsReducerPath,
  ReduxState
>(nodeProductsReducerPath);

export const {
  selectRequests: selectNodeProductsRequests,
  selectMetadata: selectNodeProductsMetadata,
  selectData: selectNodeProductsData,
  selectConfig: selectNodeProductsConfig,
} = nodeProductsReducerSelectors;
