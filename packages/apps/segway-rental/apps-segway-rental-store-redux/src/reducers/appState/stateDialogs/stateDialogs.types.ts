import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { ConfirmDialogProps } from '@js-modules/web-react-components';

interface StateDialogsReducerMetadata extends ReducerMetadata {
  confirmDialogMetadata?: ConfirmDialogProps;
  segwaysEditDialogMetadata?: {
    nodeSegwayPk: string | null;
  };
  segwaysReserveDialogMetadata?: {
    nodeSegwayPk: string;
    nodeUserPk: string;
  };
  usersEditDialogMetadata?: {
    nodeUserPk: string;
  };
}

export type StateDialogsReducer = Reducer<StateDialogsReducerMetadata, Entity>;
