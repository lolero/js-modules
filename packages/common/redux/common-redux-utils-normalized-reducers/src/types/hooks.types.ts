import {
  Entity,
  Reducer,
  ReducerMetadata,
  Request,
  RequestMetadata,
} from './reducers.types';

export type ReducerHooks<
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
> = {
  useRequest: (
    requestId: string,
  ) => Reducer<ReducerMetadataT, EntityT>['requests'][string] | undefined;
  useRequests: (
    requestIds?: string[],
  ) => Partial<Reducer<ReducerMetadataT, EntityT>['requests']>;
  useReducerMetadata: () => Reducer<ReducerMetadataT, EntityT>['metadata'];
  useEntity: (
    entityPk: string,
  ) => Reducer<ReducerMetadataT, EntityT>['data'][string] | undefined;
  useEntities: (
    entityPks?: string[],
  ) => Partial<Reducer<ReducerMetadataT, EntityT>['data']>;
  useReducerConfig: () => Reducer<ReducerMetadataT, EntityT>['config'];
};

export type UseReducerRequest<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  CallbackT extends (...args: any[]) => void,
> = {
  request?: Request<RequestMetadataT>;
  reducerMetadata: ReducerMetadataT;
  entities: Partial<Reducer<ReducerMetadataT, EntityT>['data']>;
  entity?: EntityT;
  callback: CallbackT;
};

export type UseRequestVoid<
  RequestMetadataT extends RequestMetadata,
  CallbackT extends (...args: any[]) => void,
> = Pick<
  UseReducerRequest<RequestMetadataT, never, never, CallbackT>,
  'request' | 'callback'
>;

export type UseRequestReducerMetadata<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  CallbackT extends (...args: any[]) => void,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT, never, CallbackT>,
  'request' | 'reducerMetadata' | 'callback'
>;

export type UseRequestEntities<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  CallbackT extends (...args: any[]) => void,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT, EntityT, CallbackT>,
  'request' | 'reducerMetadata' | 'entities' | 'callback'
>;

export type UseRequestEntity<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  CallbackT extends (...args: any[]) => void,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT, EntityT, CallbackT>,
  'request' | 'reducerMetadata' | 'entity' | 'callback'
>;
