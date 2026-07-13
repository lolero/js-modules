import type { Entity } from '@js-modules/common-redux-utils-normalized-reducers';
import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { stateMainReducerPath } from './stateMain.reducer.path';
import type { StateMainReducer } from './stateMain.types';

export const stateMainSelectors = createReducerSelectors<
  StateMainReducer['metadata'],
  Entity,
  typeof stateMainReducerPath,
  ReduxState
>(stateMainReducerPath);

export const {
  // selectRequests: selectStateMainRequests,
  // selectMetadata: selectStateMainMetadata,
  // selectConfig: selectStateMainConfig,
} = stateMainSelectors;
