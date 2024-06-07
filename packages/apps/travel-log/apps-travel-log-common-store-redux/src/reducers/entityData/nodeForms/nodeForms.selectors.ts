import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeForm, NodeFormsReducer } from './nodeForms.types';
import { ReduxState } from '../../reducers.types';
import { nodeFormsReducerPath } from './nodeForms.reducerPath';

export const nodeFormsSelectors = createReducerSelectors<
  NodeFormsReducer['metadata'],
  NodeForm,
  typeof nodeFormsReducerPath,
  ReduxState
>(nodeFormsReducerPath);

export const {
  selectRequests: selectNodeFormsRequests,
  selectMetadata: selectNodeFormsMetadata,
  selectData: selectNodeFormsData,
  selectConfig: selectNodeFormsConfig,
} = nodeFormsSelectors;
