import { createReducerPkUtils } from '@js-modules/common-redux-utils-normalized-reducers';
import type { NodeLogEntry } from './nodeLogEntries.types';
import { nodeLogEntriesPkSchema } from './nodeLogEntries.types';

export const {
  getPkOfEntity: getPkOfNodeLogEntry,
  destructPk: destructNodeLogEntryPk,
} = createReducerPkUtils<NodeLogEntry, typeof nodeLogEntriesPkSchema>(
  nodeLogEntriesPkSchema,
);
