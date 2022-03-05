import { createReducerSelectors, Entity } from 'normalized-reducers-utils';
import { StateWeb3Reducer } from './stateWeb3.types';
import { ReduxState } from '../../reducers.types';
import stateWeb3ReducerPath from './stateWeb3.reducerPath';

export const {
  selectRequests: selectStateWeb3Requests,
  selectMetadata: selectStateWeb3Metadata,
  selectConfig: selectStateWeb3Config,
} = createReducerSelectors<
  StateWeb3Reducer['metadata'],
  Entity,
  typeof stateWeb3ReducerPath,
  ReduxState
>(stateWeb3ReducerPath);
