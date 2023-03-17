import { EntityDataReducers } from './entityData.types';

import { nodeProductsInitialState } from './nodeProducts/nodeProducts.initialState';

export const entityDataInitialState: EntityDataReducers = {
  nodeProductsReducer: nodeProductsInitialState,
};
