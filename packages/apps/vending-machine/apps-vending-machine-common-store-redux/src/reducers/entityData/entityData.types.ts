import { NodeProductsReducer } from './nodeProducts/nodeProducts.types';
import { NodeProductsReducerHittingAction } from './nodeProducts/nodeProducts.actionsTypes';

export type EntityDataReducerHittingAction = NodeProductsReducerHittingAction;

export interface EntityDataReducers {
  nodeProductsReducer: NodeProductsReducer;
}
