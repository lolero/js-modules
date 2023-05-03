import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateSettingsReducer } from './stateSettings.types';

const stateSettingsReducerMetadataInitialState: StateSettingsReducer['metadata'] =
  {
    profile: null,
    profilePartialUnsaved: null,
    profilePartialUnsavedErrors: [],
    profileUpdateRequestId: null,
  };

const stateSettingsReducerDataInitialState: StateSettingsReducer['data'] = {};

export const stateSettingsInitialState = createInitialState<
  typeof stateSettingsReducerMetadataInitialState,
  Entity
>(
  stateSettingsReducerMetadataInitialState,
  stateSettingsReducerDataInitialState,
);
