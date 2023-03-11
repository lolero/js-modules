import {
  Entity,
  PkSchema,
  Reducer,
  ReducerEdges,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { UserRoles } from '../../appState/stateAuth/stateAuth.types';
import nodeReservationsReducerPath from '../nodeReservations/nodeReservations.reducerPath';

export type NodeUserRaw = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRoles;
  creationTime: string;
  lastSignInTime: string;
};

export interface NodeUser extends Entity {
  uid: string;
  email: string;
  displayName: string;
  role: UserRoles;
  createdAt: string;
  lastSignInAt: string;
  __edges__: {
    reservations: string[];
  };
}

export const nodeUsersPkSchema: PkSchema<NodeUser, ['uid'], []> = {
  fields: ['uid'],
  edges: [],
  separator: '_node_users_sep_',
  subSeparator: '_node_users_sub_sep_',
};

type NodeUsersReducerMetadata = ReducerMetadata;

export type NodeUsersReducer = Reducer<NodeUsersReducerMetadata, NodeUser>;

const nodeUsersReducerEdgesWithoutTypes = {
  reservations: {
    nodeReducerPath: nodeReservationsReducerPath,
    edgeReducerPath: null,
  },
} as const;

export const nodeUsersReducerEdges: ReducerEdges<
  NodeUser,
  typeof nodeUsersReducerEdgesWithoutTypes
> = nodeUsersReducerEdgesWithoutTypes;
