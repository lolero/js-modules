import type { Entity } from '@js-modules/common-redux-utils-normalized-reducers';
import { createInitialState } from '@js-modules/common-redux-utils-normalized-reducers';
import type { StateSettingsReducer } from './stateSettings.types';

const stateSettingsReducerMetadataInitialState: StateSettingsReducer['metadata'] =
  {
    profile: null,
    profilePartialUnsaved: null,
  };

const stateSettingsReducerDataInitialState: StateSettingsReducer['data'] = {};

export const stateSettingsInitialState = createInitialState<
  typeof stateSettingsReducerMetadataInitialState,
  Entity
>(
  stateSettingsReducerMetadataInitialState,
  stateSettingsReducerDataInitialState,
);
