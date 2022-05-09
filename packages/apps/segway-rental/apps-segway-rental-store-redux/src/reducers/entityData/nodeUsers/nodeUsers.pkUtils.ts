import { createReducerPkUtils } from 'normalized-reducers-utils';
import { NodeUser, nodeUsersPkSchema } from './nodeUsers.types';

export const {
  getPkOfEntity: getPkOfNodeUser,
  destructPk: destructNodeUserPk,
} = createReducerPkUtils<NodeUser, typeof nodeUsersPkSchema>(nodeUsersPkSchema);
