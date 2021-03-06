import { Entity, Reducer, ReducerMetadata } from 'normalized-reducers-utils';

export enum ThemePalette {
  light = 'light',
  dark = 'dark',
}

export interface StateMainReducerMetadata extends ReducerMetadata {
  themePalette: ThemePalette;
  getNodeChainsRequestId: string | null;
}

export type StateMainReducer = Reducer<StateMainReducerMetadata, Entity>;
