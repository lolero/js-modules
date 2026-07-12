import type { LogEntriesFindManyDto } from '@js-modules/apps-travel-log-api-modules-core/src/modules/logEntries/dtos/logEntries.findMany.dto';
import type { LogEntriesEntity } from '@js-modules/apps-travel-log-api-modules-core/src/modules/logEntries/logEntries.entity';
import type { LogEntriesUniqueKeyName } from '@js-modules/apps-travel-log-api-modules-core/src/modules/logEntries/logEntries.types';
import type {
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
import type { Enum } from '@js-modules/common-utils-general';
import type {
  NodeLogEntriesReducer,
  NodeLogEntry,
} from './nodeLogEntries.types';

export const NodeLogEntriesActionTypes = {
  NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS:
    'NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS',
  NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST:
    'NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS:
    'NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL:
    'NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL',
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST:
    'NODE_LOG_ENTRIES__CREATE_ONE__REQUEST',
  NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS:
    'NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS',
  NODE_LOG_ENTRIES__CREATE_ONE__FAIL: 'NODE_LOG_ENTRIES__CREATE_ONE__FAIL',
  NODE_LOG_ENTRIES__GET_ONE__REQUEST: 'NODE_LOG_ENTRIES__GET_ONE__REQUEST',
  NODE_LOG_ENTRIES__GET_ONE__SUCCESS: 'NODE_LOG_ENTRIES__GET_ONE__SUCCESS',
  NODE_LOG_ENTRIES__GET_ONE__FAIL: 'NODE_LOG_ENTRIES__GET_ONE__FAIL',
  NODE_LOG_ENTRIES__GET_MANY__REQUEST: 'NODE_LOG_ENTRIES__GET_MANY__REQUEST',
  NODE_LOG_ENTRIES__GET_MANY__SUCCESS: 'NODE_LOG_ENTRIES__GET_MANY__SUCCESS',
  NODE_LOG_ENTRIES__GET_MANY__FAIL: 'NODE_LOG_ENTRIES__GET_MANY__FAIL',
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST:
    'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS:
    'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL:
    'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST:
    'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS:
    'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL:
    'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL',
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST:
    'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST',
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS:
    'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS',
  NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL:
    'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL',
  NODE_LOG_ENTRIES__DELETE_ONE__REQUEST:
    'NODE_LOG_ENTRIES__DELETE_ONE__REQUEST',
  NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS:
    'NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS',
  NODE_LOG_ENTRIES__DELETE_ONE__FAIL: 'NODE_LOG_ENTRIES__DELETE_ONE__FAIL',
  NODE_LOG_ENTRIES__DELETE_MANY__REQUEST:
    'NODE_LOG_ENTRIES__DELETE_MANY__REQUEST',
  NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS:
    'NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS',
  NODE_LOG_ENTRIES__DELETE_MANY__FAIL: 'NODE_LOG_ENTRIES__DELETE_MANY__FAIL',
} as const;
export type NodeLogEntriesActionTypes = Enum<typeof NodeLogEntriesActionTypes>;

export type NodeLogEntriesClearReducerRequestsAction =
  ClearReducerRequestsAction<
    typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CLEAR_REDUCER_REQUESTS
  >;

export type NodeLogEntriesUpdatePartialReducerMetadataRequestAction =
  RequestAction<
    typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__REQUEST,
    UpdatePartialReducerMetadataRequestMetadata<
      NodeLogEntriesReducer['metadata']
    >
  >;

export type NodeLogEntriesUpdatePartialReducerMetadataSuccessAction =
  SavePartialReducerMetadataAction<
    typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__SUCCESS,
    NodeLogEntriesReducer['metadata']
  >;

export type NodeLogEntriesUpdatePartialReducerMetadataFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_PARTIAL_REDUCER_METADATA__FAIL
>;

export const NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID =
  'NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID';
export type NodeLogEntriesCreateOneRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__REQUEST,
  CreateOneEntityRequestMetadata<NodeLogEntry>
>;

export type NodeLogEntriesCreateOneSuccessAction = SaveWholeEntitiesAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesCreateOneFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__CREATE_ONE__FAIL
>;

export type NodeLogEntriesGetOneRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__REQUEST,
  GetOneEntityRequestMetadata<LogEntriesEntity, LogEntriesUniqueKeyName>
>;

export type NodeLogEntriesGetOneSuccessAction = SaveWholeEntitiesAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesGetOneFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_ONE__FAIL
>;

export type NodeLogEntriesGetManyRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata<LogEntriesEntity, LogEntriesFindManyDto>
>;

export type NodeLogEntriesGetManySuccessAction = SaveWholeEntitiesAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesGetManyFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__GET_MANY__FAIL
>;

export const NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID =
  'NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID';
export type NodeLogEntriesUpdateOneWholeRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST,
  UpdateOneWholeEntityRequestMetadata<NodeLogEntry>
>;

export type NodeLogEntriesUpdateOneWholeSuccessAction = SaveWholeEntitiesAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__SUCCESS,
  NodeLogEntriesReducer['metadata'],
  NodeLogEntry
>;

export type NodeLogEntriesUpdateOneWholeFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__FAIL
>;

export const NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID =
  'NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST_ID';
export type NodeLogEntriesUpdateOnePartialRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__REQUEST,
  UpdateOnePartialEntityRequestMetadata<NodeLogEntry>
>;

export type NodeLogEntriesUpdateOnePartialSuccessAction =
  SaveWholeEntitiesAction<
    typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__SUCCESS,
    NodeLogEntriesReducer['metadata'],
    NodeLogEntry
  >;

export type NodeLogEntriesUpdateOnePartialFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_ONE_PARTIAL__FAIL
>;

export const NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID =
  'NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST_ID';
export type NodeLogEntriesUpdateManyPartialWithPatternRequestAction =
  RequestAction<
    typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__REQUEST,
    UpdateManyPartialEntitiesWithPatternRequestMetadata<NodeLogEntry>
  >;

export type NodeLogEntriesUpdateManyPartialWithPatternSuccessAction =
  SaveWholeEntitiesAction<
    typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__SUCCESS,
    NodeLogEntriesReducer['metadata'],
    NodeLogEntry
  >;

export type NodeLogEntriesUpdateManyPartialWithPatternFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__UPDATE_MANY_PARTIAL_WITH_PATTERN__FAIL
>;

export const NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID =
  'NODE_LOG_ENTRIES__DELETE_ONE__REQUEST_ID';
export type NodeLogEntriesDeleteOneRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__REQUEST,
  DeleteOneEntityRequestMetadata
>;

export type NodeLogEntriesDeleteOneSuccessAction = DeleteEntitiesAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__SUCCESS,
  NodeLogEntriesReducer['metadata']
>;

export type NodeLogEntriesDeleteOneFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_ONE__FAIL
>;

export const NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID =
  'NODE_LOG_ENTRIES__DELETE_MANY__REQUEST_ID';
export type NodeLogEntriesDeleteManyRequestAction = RequestAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__REQUEST,
  DeleteManyEntitiesRequestMetadata
>;

export type NodeLogEntriesDeleteManySuccessAction = DeleteEntitiesAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__SUCCESS,
  NodeLogEntriesReducer['metadata']
>;

export type NodeLogEntriesDeleteManyFailAction = FailAction<
  typeof NodeLogEntriesActionTypes.NODE_LOG_ENTRIES__DELETE_MANY__FAIL
>;

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
