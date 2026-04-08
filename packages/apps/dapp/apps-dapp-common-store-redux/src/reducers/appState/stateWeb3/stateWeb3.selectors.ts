import type { Entity } from '@js-modules/common-redux-utils-normalized-reducers';
import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { stateWeb3ReducerPath } from './stateWeb3.reducerPath';
import type { StateWeb3Reducer } from './stateWeb3.types';

export const stateWeb3Selectors = createReducerSelectors<
  StateWeb3Reducer['metadata'],
  Entity,
  typeof stateWeb3ReducerPath,
  ReduxState
>(stateWeb3ReducerPath);

export const {
  selectRequests: selectStateWeb3Requests,
  selectMetadata: selectStateWeb3Metadata,
  selectConfig: selectStateWeb3Config,
} = stateWeb3Selectors;
