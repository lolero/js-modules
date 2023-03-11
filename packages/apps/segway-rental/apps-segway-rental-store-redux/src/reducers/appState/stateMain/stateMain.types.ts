import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export enum ThemePalette {
  light = 'light',
  dark = 'dark',
}

interface StateMainReducerMetadata extends ReducerMetadata {
  themePalette: ThemePalette;
}

export type StateMainReducer = Reducer<StateMainReducerMetadata, Entity>;
