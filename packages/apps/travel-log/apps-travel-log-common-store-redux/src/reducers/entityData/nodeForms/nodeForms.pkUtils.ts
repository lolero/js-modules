import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import { NodeForm, nodeFormsPkSchema } from './nodeForms.types';

export const {
  getPkOfEntity: getPkOfNodeForm,
  destructPk: destructNodeFormPk,
} = createReducerPkUtils<NodeForm, typeof nodeFormsPkSchema>(nodeFormsPkSchema);
