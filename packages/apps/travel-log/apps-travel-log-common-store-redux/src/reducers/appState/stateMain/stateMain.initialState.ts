import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { ThemePalette } from '@js-modules/apps-travel-log-common-constants';
import { StateMainReducer } from './stateMain.types';

const stateMainReducerMetadataInitialState: StateMainReducer['metadata'] = {
  themePalette: ThemePalette.light,
  getNodeChainsRequestId: null,
};

const stateMainReducerDataInitialState: StateMainReducer['data'] = {};

export const stateMainInitialState = createInitialState<
  typeof stateMainReducerMetadataInitialState,
  Entity
>(stateMainReducerMetadataInitialState, stateMainReducerDataInitialState);
