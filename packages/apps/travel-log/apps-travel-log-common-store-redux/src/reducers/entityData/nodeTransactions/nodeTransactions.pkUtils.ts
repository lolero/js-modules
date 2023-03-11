import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import {
  NodeTransaction,
  nodeTransactionsPkSchema,
} from './nodeTransactions.types';

export const {
  getPkOfEntity: getPkOfNodeTransaction,
  destructPk: destructNodeTransactionPk,
} = createReducerPkUtils<NodeTransaction, typeof nodeTransactionsPkSchema>(
  nodeTransactionsPkSchema,
);
