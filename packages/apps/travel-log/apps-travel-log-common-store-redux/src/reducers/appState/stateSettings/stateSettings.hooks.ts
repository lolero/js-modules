import { createReducerHooks } from '@js-modules/common-redux-utils-normalized-reducers';
import { stateSettingsSelectors } from './stateSettings.selectors';

export const stateSettingsHooks = createReducerHooks(stateSettingsSelectors);

export const {
  useRequest: useStateSettingsRequest,
  useRequests: useStateSettingsRequests,
  useReducerMetadata: useStateSettingsReducerMetadata,
  useReducerConfig: useStateSettingsReducerConfig,
} = stateSettingsHooks;
