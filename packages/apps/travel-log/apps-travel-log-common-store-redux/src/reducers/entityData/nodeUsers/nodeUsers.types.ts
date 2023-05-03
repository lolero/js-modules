import {
  Entity,
  PkSchema,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

export interface NodeUser extends Entity {
  id: number;
  username?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  createdAt: string;
  deletedAt?: string | null;
}

export const nodeUsersPkSchema: PkSchema<NodeUser, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_users_sep_',
  subSeparator: '_node_users_sub_sep_',
};

type NodeUsersReducerMetadata = ReducerMetadata;

export type NodeUsersReducer = Reducer<NodeUsersReducerMetadata, NodeUser>;
