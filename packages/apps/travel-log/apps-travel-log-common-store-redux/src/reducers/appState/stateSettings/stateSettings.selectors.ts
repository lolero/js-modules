import type { Entity } from '@js-modules/common-redux-utils-normalized-reducers';
import { createReducerSelectors } from '@js-modules/common-redux-utils-normalized-reducers';
import type { ReduxState } from '../../reducers.types';
import { stateSettingsReducerPath } from './stateSettings.reducer.path';
import type { StateSettingsReducer } from './stateSettings.types';

export const stateSettingsSelectors = createReducerSelectors<
  StateSettingsReducer['metadata'],
  Entity,
  typeof stateSettingsReducerPath,
  ReduxState
>(stateSettingsReducerPath);

export const {
  selectRequests: selectStateSettingsRequests,
  selectMetadata: selectStateSettingsMetadata,
  selectConfig: selectStateSettingsConfig,
} = stateSettingsSelectors;
