import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateMainReducer, ThemePalette } from './stateMain.types';

const stateMainReducerMetadataInitialState: StateMainReducer['metadata'] = {
  themePalette: ThemePalette.light,
};

const stateMainReducerDataInitialState: StateMainReducer['data'] = {};

export const stateMainInitialState = createInitialState<
  typeof stateMainReducerMetadataInitialState,
  Entity
>(stateMainReducerMetadataInitialState, stateMainReducerDataInitialState);
