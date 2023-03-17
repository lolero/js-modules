import {
  createInitialState,
  Entity,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { StateMainReducer, ThemePalette } from './stateMain.types';

const stateMainReducerMetadataInitialState: StateMainReducer['metadata'] = {
  themePalette: ThemePalette.light,
  myBalance: null,
  change: null,
  purchasedProductPks: null,
};

const stateMainReducerDataInitialState: StateMainReducer['data'] = {};

export const stateMainInitialState = createInitialState<
  typeof stateMainReducerMetadataInitialState,
  Entity
>(stateMainReducerMetadataInitialState, stateMainReducerDataInitialState);
