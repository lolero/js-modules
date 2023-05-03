import {
  createReducerSelectors,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateSettingsReducer } from './stateSettings.types';
import { ReduxState } from '../../reducers.types';
import { stateSettingsReducerPath } from './stateSettings.reducerPath';

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
