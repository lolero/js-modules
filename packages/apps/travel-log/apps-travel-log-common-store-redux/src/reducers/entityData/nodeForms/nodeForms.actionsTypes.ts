import {
  FailAction,
  GetManyEntitiesRequestMetadata,
  RequestAction,
  SavePartialEntitiesAction,
  SaveWholeEntitiesAction,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { EntityUniqueKeyValue } from '@js-modules/api-nest-utils';
import { UsersUniqueKeyName } from '@js-modules/apps-travel-log-api-core-modules/src/modules/users/users.types';
import { NodeForm, NodeFormsReducer } from './nodeForms.types';

export enum NodeFormsActionTypes {
  NODE_FORMS__UPDATE_ONE_PARTIAL__REQUEST = 'NODE_FORMS__UPDATE_ONE_PARTIAL__REQUEST',
  NODE_FORMS__UPDATE_ONE_PARTIAL__SUCCESS = 'NODE_FORMS__UPDATE_ONE_PARTIAL__SUCCESS',
  NODE_FORMS__UPDATE_ONE_PARTIAL__FAIL = 'NODE_FORMS__UPDATE_ONE_PARTIAL__FAIL',
  NODE_FORMS__GET_ONE__REQUEST = 'NODE_FORMS__GET_ONE__REQUEST',
  NODE_FORMS__GET_ONE__SUCCESS = 'NODE_FORMS__GET_ONE__SUCCESS',
  NODE_FORMS__GET_ONE__FAIL = 'NODE_FORMS__GET_ONE__FAIL',
  NODE_FORMS__GET_MANY__REQUEST = 'NODE_FORMS__GET_MANY__REQUEST',
  NODE_FORMS__GET_MANY__SUCCESS = 'NODE_FORMS__GET_MANY__SUCCESS',
  NODE_FORMS__GET_MANY__FAIL = 'NODE_FORMS__GET_MANY__FAIL',
}

export type NodeFormsUpdateOnePartialRequestAction = RequestAction<
  NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__REQUEST,
  {
    nodeFormPk: string;
    nodeFormPartial: Partial<NodeForm>;
  }
>;

export type NodeFormsUpdateOnePartialSuccessAction = SavePartialEntitiesAction<
  NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__SUCCESS,
  NodeFormsReducer['metadata'],
  NodeForm
>;

export type NodeFormsUpdateOnePartialFailAction =
  FailAction<NodeFormsActionTypes.NODE_FORMS__UPDATE_ONE_PARTIAL__FAIL>;

export type NodeFormsGetOneRequestAction = RequestAction<
  NodeFormsActionTypes.NODE_FORMS__GET_ONE__REQUEST,
  {
    uniqueKeyValue: EntityUniqueKeyValue;
    uniqueKeyName: UsersUniqueKeyName;
  }
>;

export type NodeFormsGetOneSuccessAction = SaveWholeEntitiesAction<
  NodeFormsActionTypes.NODE_FORMS__GET_ONE__SUCCESS,
  NodeFormsReducer['metadata'],
  NodeForm
>;

export type NodeFormsGetOneFailAction =
  FailAction<NodeFormsActionTypes.NODE_FORMS__GET_ONE__FAIL>;

export type NodeFormsGetManyRequestAction = RequestAction<
  NodeFormsActionTypes.NODE_FORMS__GET_MANY__REQUEST,
  GetManyEntitiesRequestMetadata
>;

export type NodeFormsGetManySuccessAction = SaveWholeEntitiesAction<
  NodeFormsActionTypes.NODE_FORMS__GET_MANY__SUCCESS,
  NodeFormsReducer['metadata'],
  NodeForm
>;

export type NodeFormsGetManyFailAction =
  FailAction<NodeFormsActionTypes.NODE_FORMS__GET_MANY__FAIL>;

export type NodeFormsReducerHittingAction =
  | NodeFormsUpdateOnePartialRequestAction
  | NodeFormsUpdateOnePartialSuccessAction
  | NodeFormsUpdateOnePartialFailAction
  | NodeFormsGetOneRequestAction
  | NodeFormsGetOneSuccessAction
  | NodeFormsGetOneFailAction
  | NodeFormsGetManyRequestAction
  | NodeFormsGetManySuccessAction
  | NodeFormsGetManyFailAction;
