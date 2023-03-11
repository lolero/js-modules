import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export enum ThemePalette {
  light = 'light',
  dark = 'dark',
}

export interface StateMainReducerMetadata extends ReducerMetadata {
  themePalette: ThemePalette;
  getNodeChainsRequestId: string | null;
}

export type StateMainReducer = Reducer<StateMainReducerMetadata, Entity>;
