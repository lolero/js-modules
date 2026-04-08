import type { ThemePalette } from '@js-modules/apps-travel-log-common-constants';
import type {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export interface StateMainReducerMetadata extends ReducerMetadata {
  themePalette: ThemePalette;
  getNodeChainsRequestId: string | null;
}

export type StateMainReducer = Reducer<StateMainReducerMetadata, Entity>;
