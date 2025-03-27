import {
  ClearReducerRequestsAction,
  CreateOneEntityRequestMetadata,
  DeleteEntitiesAction,
  DeleteManyEntitiesRequestMetadata,
  DeleteOneEntityRequestMetadata,
  FailAction,
  GetManyEntitiesRequestMetadata,
  GetOneEntityRequestMetadata,
  RequestAction,
  SavePartialReducerMetadataAction,
  SaveWholeEntitiesAction,
  UpdateManyPartialEntitiesWithPatternRequestMetadata,
  UpdateOnePartialEntityRequestMetadata,
  UpdateOneWholeEntityRequestMetadata,
  UpdatePartialReducerMetadataRequestMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { LogEntriesFindManyDto } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/dtos/logEntries.findMany.dto';
import { LogEntriesEntity } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/logEntries.entity';
import { LogEntriesUniqueKeyName } from '@js-modules/apps-travel-log-api-core-modules/src/modules/logEntries/logEntries.types';
import { NodeLogEntry, NodeLogEntriesReducer } from './nodeLogEntries.types';

export enum NodeLogEntriesActionTypes {
  NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS = 'NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS',
  NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST = 'NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS = 'NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL = 'NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST = 'NODE_LOG_ENTRIES__CREATE_ONE__REQUEST',
  NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS = 'NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS',
  NODE_LOG_ENTRIES__CREATE_ONE__FAIL = 'NODE_LOG_ENTRIES__CREATE_ONE__FAIL',
  NODE_LOG_ENTRIES__GET_ONE__REQUEST = 'NODE_LOG_ENTRIES__GET_ONE__REQUEST',
  NODE_LOG_ENTRIES__GET_ONE__SUCCESS = 'NODE_LOG_ENTRIES__GET_ONE__SUCCESS',
  NODE_LOG_ENTRIES__GET_ONE__FAIL = 'NODE_LOG_ENTRIES__GET_ONE__FAIL',
  NODE_LOG_ENTRIES__GET_MANY__REQUEST = 'NODE_LOG_ENTRIES__GET_MANY__REQUEST',
  NODE_LOG_ENTRIES__GET_MANY__SUCCESS = 'NODE_LOG_ENTRIES__GET_MANY__SUCCESS',
  NODE_LOG_ENTRIES__GET_MANY__FAIL = 'NODE_LOG_ENTRIES__GET_MANY__FAIL',
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST = 'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS = 'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL = 'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST = 'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS = 'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL = 'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL',
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST = 'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS = 'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL = 'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL',
  NODE_LOG_ENTRIES__DELETE_ONE__REQUEST = 'NODE_LOG_ENTRIES__DELETE_ONE__REQUEST',
  NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS = 'NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS',
  NODE_LOG_ENTRIES__DELETE_ONE__FAIL = 'NODE_LOG_ENTRIES__DELETE_ONE__FAIL',
  NODE_LOG_ENTRIES__DELETE_MANY__REQUEST = 'NODE_LOG_ENTRIES__DELETE_MANY__REQUEST',
  NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS = 'NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS',
  NODE_LOG_ENTRIES__DELETE_MANY__FAIL = 'NODE_LOG_ENTRIES__DELETE_MANY__FAIL',
}

export type NodeLogEntriesClearReducerRequestsAction =
  ClearReducerRequestsAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS>;

export type NodeLogEntriesUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<
      NodeLogEntriesReducer['metadata']
    >
  >;

export type NodeLogEntriesUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    NodeLogEntriesReducer['metadata']
  >;

export type NodeLogEntriesUpdatePartialReducerMetadataFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL>;

export type NodeLogEntriesCreateOneRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
  CreateOneEntityRequestMetadata<NodeLogEntry>
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
  GetOneEntityRequestMetadata<LogEntriesEntity, LogEntriesUniqueKeyName>
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
  GetManyEntitiesRequestMetadata<LogEntriesEntity, LogEntriesFindManyDto>
>;

export type NodeLogEntriesGetManySuccessAction = SaveWholeEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesGetManyFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__FAIL>;

export type NodeLogEntriesUpdateOneWholeRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST,
  UpdateOneWholeEntityRequestMetadata<NodeLogEntry>
>;

export type NodeLogEntriesUpdateOneWholeSuccessAction = SaveWholeEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesUpdateOneWholeFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL>;

export type NodeLogEntriesUpdateOnePartialRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
  UpdateOnePartialEntityRequestMetadata<NodeLogEntry>
>;

export type NodeLogEntriesUpdateOnePartialSuccessAction =
  SaveWholeEntitiesAction<
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS,
    NodeLogEntriesReducer['metadata'],
    NodeLogEntry
  >;

export type NodeLogEntriesUpdateOnePartialFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL>;

export type NodeLogEntriesUpdateManyPartialWithPatternRequestAction =
  RequestAction<
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST,
    UpdateManyPartialEntitiesWithPatternRequestMetadata<NodeLogEntry>
  >;

export type NodeLogEntriesUpdateManyPartialWithPatternSuccessAction =
  SaveWholeEntitiesAction<
    NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS,
    NodeLogEntriesReducer['metadata'],
    NodeLogEntry
  >;

export type NodeLogEntriesUpdateManyPartialWithPatternFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL>;

export type NodeLogEntriesDeleteOneRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__REQUEST,
  DeleteOneEntityRequestMetadata
>;

export type NodeLogEntriesDeleteOneSuccessAction = DeleteEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS,
  NodeLogEntriesReducer['metadata']
>;

export type NodeLogEntriesDeleteOneFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__FAIL>;

export type NodeLogEntriesDeleteManyRequestAction = RequestAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__REQUEST,
  DeleteManyEntitiesRequestMetadata
>;

export type NodeLogEntriesDeleteManySuccessAction = DeleteEntitiesAction<
  NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS,
  NodeLogEntriesReducer['metadata']
>;

export type NodeLogEntriesDeleteManyFailAction =
  FailAction<NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__FAIL>;

export type NodeLogEntriesReducerHittingAction =
  | NodeLogEntriesClearReducerRequestsAction
  | NodeLogEntriesUpdatePartialReducerMetadataRequestAction
  | NodeLogEntriesUpdatePartialReducerMetadataSuccessAction
  | NodeLogEntriesUpdatePartialReducerMetadataFailAction
  | NodeLogEntriesCreateOneRequestAction
  | NodeLogEntriesCreateOneSuccessAction
  | NodeLogEntriesCreateOneFailAction
  | NodeLogEntriesGetOneRequestAction
  | NodeLogEntriesGetOneSuccessAction
  | NodeLogEntriesGetOneFailAction
  | NodeLogEntriesGetManyRequestAction
  | NodeLogEntriesGetManySuccessAction
  | NodeLogEntriesGetManyFailAction
  | NodeLogEntriesUpdateOneWholeRequestAction
  | NodeLogEntriesUpdateOneWholeSuccessAction
  | NodeLogEntriesUpdateOneWholeFailAction
  | NodeLogEntriesUpdateOnePartialRequestAction
  | NodeLogEntriesUpdateOnePartialSuccessAction
  | NodeLogEntriesUpdateOnePartialFailAction
  | NodeLogEntriesUpdateManyPartialWithPatternRequestAction
  | NodeLogEntriesUpdateManyPartialWithPatternSuccessAction
  | NodeLogEntriesUpdateManyPartialWithPatternFailAction
  | NodeLogEntriesDeleteOneRequestAction
  | NodeLogEntriesDeleteOneSuccessAction
  | NodeLogEntriesDeleteOneFailAction
  | NodeLogEntriesDeleteManyRequestAction
  | NodeLogEntriesDeleteManySuccessAction
  | NodeLogEntriesDeleteManyFailAction;
