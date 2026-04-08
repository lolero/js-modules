import type { UsersPrivateDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/users/dtos/users.private.dto';
import type { UsersUpdateOnePartialDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/users/dtos/users.updateOnePartial.dto';
import type {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export interface StateSettingsReducerMetadata extends ReducerMetadata {
  profile: UsersPrivateDto | null;
  profilePartialUnsaved: UsersUpdateOnePartialDto | null;
}

export type StateSettingsReducer = Reducer<
  StateSettingsReducerMetadata,
  Entity
>;
