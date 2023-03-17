import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeProduct, NodeProductsReducer } from './nodeProducts.types';

const nodeProductsReducerMetadataInitialState: NodeProductsReducer['metadata'] =
  {
    nodeProductsGetManyRequestId: null,
  };

const nodeProductsReducerDataInitialState: NodeProductsReducer['data'] = {};

export const nodeProductsInitialState = createInitialState<
  NodeProductsReducer['metadata'],
  NodeProduct
>(nodeProductsReducerMetadataInitialState, nodeProductsReducerDataInitialState);
