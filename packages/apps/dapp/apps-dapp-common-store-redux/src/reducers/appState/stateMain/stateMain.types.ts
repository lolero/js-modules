import type {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import type { Enum } from '@js-modules/common-utils-general';

export const ThemePalette = {
  light: 'light',
  dark: 'dark',
} as const;
export type ThemePalette = Enum<typeof ThemePalette>;

export interface StateMainReducerMetadata extends ReducerMetadata {
  themePalette: ThemePalette;
}

export type StateMainReducer = Reducer<StateMainReducerMetadata, Entity>;
