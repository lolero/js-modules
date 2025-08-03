import {
  Entity,
  PkSchema,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { LogEntriesDto } from '@js-modules/apps-travel-log-api-core-modules';

export const nodeLogEntryUnsavedEmpty: NodeLogEntry = {
  id: 0,
  title: '',
  description: '',
  createdAt: '',
  __edges__: {
    user: [''],
  },
};

export interface NodeLogEntry extends Entity {
  id: LogEntriesDto['id'];
  title: LogEntriesDto['title'];
  description?: LogEntriesDto['description'];
  createdAt: LogEntriesDto['createdAt'];
  updatedAt?: LogEntriesDto['updatedAt'];
  deletedAt?: LogEntriesDto['deletedAt'];
  __edges__: {
    user: [string];
  };
}

export const nodeLogEntriesPkSchema: PkSchema<NodeLogEntry, ['id'], []> = {
  fields: ['id'],
  edges: [],
  separator: '_node_log_entries_sep_',
  subSeparator: '_node_log_entries_sub_sep_',
};

export interface NodeLogEntriesReducerMetadata extends ReducerMetadata {
  getManyTotal: number;
  getManyPksSorted: string[];
  nodeLogEntryUnsaved: NodeLogEntry | null;
}

export type NodeLogEntriesReducer = Reducer<
  NodeLogEntriesReducerMetadata,
  NodeLogEntry
>;
