import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { UsersPrivateDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.private.dto';
import { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/dtos/users.updateOnePartial.dto';
import { ValidationError } from 'class-validator';

export interface StateSettingsReducerMetadata extends ReducerMetadata {
  profile: UsersPrivateDto | null;
  profilePartialUnsaved: UsersUpdateOnePartialDto | null;
  profilePartialUnsavedErrors: ValidationError[];
  profileUpdateRequestId: string | null;
}

export type StateSettingsReducer = Reducer<
  StateSettingsReducerMetadata,
  Entity
>;
