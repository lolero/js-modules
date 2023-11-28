import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeForm, NodeFormsReducer } from './nodeForms.types';

const nodeFormsReducerMetadataInitialState: NodeFormsReducer['metadata'] = {};

const nodeFormsReducerDataInitialState: NodeFormsReducer['data'] = {};

export const nodeFormsInitialState = createInitialState<
  NodeFormsReducer['metadata'],
  NodeForm
>(nodeFormsReducerMetadataInitialState, nodeFormsReducerDataInitialState);
