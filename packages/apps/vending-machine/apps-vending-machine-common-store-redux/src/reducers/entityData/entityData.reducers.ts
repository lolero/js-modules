import { combineReducers } from 'redux';

import { nodeProductsReducer } from './nodeProducts/nodeProducts.reducer';

export const entityDataReducers = combineReducers({
  nodeProductsReducer,
});
