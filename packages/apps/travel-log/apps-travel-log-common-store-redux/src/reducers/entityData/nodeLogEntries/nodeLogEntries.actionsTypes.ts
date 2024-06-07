import {
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SavePartialEntitiesAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { EntityUniqueKeyValue } from '@js-modules/api-nest-utils';
import { UsersUniqueKeyName } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/users.types';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';

export enum NodeLogEntriesActionTypes {
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST = 'NODE_LOG_ENTRIES__CREATE_ONE__REQUEST',
  NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS = 'NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS',
  NODE_LOG_ENTRIES__CREATE_ONE__FAIL = 'NODE_LOG_ENTRIES__CREATE_ONE__FAIL',
  NODE_LOG_ENTRIES__GET_ONE__REQUEST = 'NODE_LOG_ENTRIES__GET_ONE__REQUEST',
  NODE_LOG_ENTRIES__GET_ONE__SUCCESS = 'NODE_LOG_ENTRIES__GET_ONE__SUCCESS',
  NODE_LOG_ENTRIES__GET_ONE__FAIL = 'NODE_LOG_ENTRIES__GET_ONE__FAIL',
  NODE_LOG_ENTRIES__GET_MANY__REQUEST = 'NODE_LOG_ENTRIES__GET_MANY__REQUEST',
  NODE_LOG_ENTRIES__GET_MANY__SUCCESS = 'NODE_LOG_ENTRIES__GET_MANY__SUCCESS',
  NODE_LOG_ENTRIES__GET_MANY__FAIL = 'NODE_LOG_ENTRIES__GET_MANY__FAIL',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST = 'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS = 'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL = 'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL',
}

export type NodeLogEntriesCreateOneRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
  {
    nodeLogEntry: NodeLogEntry;
  }
>;

export type NodeLogEntriesCreateOneSuccessAction = SaveWholeEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesCreateOneFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__FAIL>;

export type NodeLogEntriesGetOneRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__REQUEST,
  {
    uniqueKeyValue: EntityUniqueKeyValue;
    uniqueKeyName: UsersUniqueKeyName;
  }
>;

export type NodeLogEntriesGetOneSuccessAction = SaveWholeEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesGetOneFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__FAIL>;

export type NodeLogEntriesGetManyRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata
>;

export type NodeLogEntriesGetManySuccessAction = SaveWholeEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesGetManyFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__FAIL>;

export type NodeLogEntriesUpdateOnePartialRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
  {
    nodeLogEntryPk: string;
    nodeLogEntryPartial: Partial<NodeLogEntry>;
  }
>;

export type NodeLogEntriesUpdateOnePartialSuccessAction =
  SavePartialEntitiesAction<
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS,
    NodeLogEntriesReducer['metadata'],
    NodeLogEntry
  >;

export type NodeLogEntriesUpdateOnePartialFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL>;

export type NodeLogEntriesReducerHittingAction =
  | NodeLogEntriesCreateOneRequestAction
  | NodeLogEntriesCreateOneSuccessAction
  | NodeLogEntriesCreateOneFailAction
  | NodeLogEntriesGetOneRequestAction
  | NodeLogEntriesGetOneSuccessAction
  | NodeLogEntriesGetOneFailAction
  | NodeLogEntriesGetManyRequestAction
  | NodeLogEntriesGetManySuccessAction
  | NodeLogEntriesGetManyFailAction
  | NodeLogEntriesUpdateOnePartialRequestAction
  | NodeLogEntriesUpdateOnePartialSuccessAction
  | NodeLogEntriesUpdateOnePartialFailAction;
