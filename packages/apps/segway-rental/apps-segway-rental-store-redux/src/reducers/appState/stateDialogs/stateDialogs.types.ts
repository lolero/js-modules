import { Entity, Reducer, ReducerMetadata } from 'normalized-reducers-utils';
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
