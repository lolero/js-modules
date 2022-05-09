import { createReducerSelectors, Entity } from 'normalized-reducers-utils';
import { StateAuthReducer } from './stateAuth.types';
import { ReduxState } from '../../reducers.types';
import stateAuthReducerPath from './stateAuth.reducerPath';

export const stateAuthSelectors = createReducerSelectors<
  StateAuthReducer['metadata'],
  Entity,
  typeof stateAuthReducerPath,
  ReduxState
>(stateAuthReducerPath);

export const {
  selectRequests: selectStateAuthRequests,
  selectMetadata: selectStateAuthMetadata,
  selectConfig: selectStateAuthConfig,
} = stateAuthSelectors;
