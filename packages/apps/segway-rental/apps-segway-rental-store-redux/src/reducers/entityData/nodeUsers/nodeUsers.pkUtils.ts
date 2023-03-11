import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeUser, nodeUsersPkSchema } from './nodeUsers.types';

export const {
  getPkOfEntity: getPkOfNodeUser,
  destructPk: destructNodeUserPk,
} = createReducerPkUtils<NodeUser, typeof nodeUsersPkSchema>(nodeUsersPkSchema);
