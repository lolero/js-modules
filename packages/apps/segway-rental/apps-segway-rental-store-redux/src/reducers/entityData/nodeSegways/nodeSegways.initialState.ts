import { createInitialState } from 'normalized-reducers-utils';
import { NodeSegway, NodeSegwaysReducer } from './nodeSegways.types';

const nodeSegwaysReducerMetadataInitialState: NodeSegwaysReducer['metadata'] =
  {};

const nodeSegwaysReducerDataInitialState: NodeSegwaysReducer['data'] = {};

export const nodeSegwaysInitialState = createInitialState<
  NodeSegwaysReducer['metadata'],
  NodeSegway
>(nodeSegwaysReducerMetadataInitialState, nodeSegwaysReducerDataInitialState);
