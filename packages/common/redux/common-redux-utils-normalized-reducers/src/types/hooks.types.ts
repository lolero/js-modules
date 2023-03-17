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
  RequestMetadataT extends RequestMetadata = RequestMetadata,
  ReducerMetadataT extends ReducerMetadata = ReducerMetadata,
  EntityT extends Entity = Entity,
  CallbackT = () => void,
> = {
  request?: Request<RequestMetadataT>;
  reducerMetadata: ReducerMetadataT;
  entities: Partial<Reducer<ReducerMetadataT, EntityT>['data']>;
  entity?: EntityT;
  callback: CallbackT;
};

export type UseRequestReducerMetadata<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT>,
  'request' | 'reducerMetadata'
>;

export type UseRequestEntities<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT, EntityT>,
  'request' | 'reducerMetadata' | 'entities'
>;

export type UseRequestEntity<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT, EntityT>,
  'request' | 'reducerMetadata' | 'entity'
>;

export type UseRequestCallback<
  RequestMetadataT extends RequestMetadata,
  ReducerMetadataT extends ReducerMetadata,
  EntityT extends Entity,
  CallbackT,
> = Pick<
  UseReducerRequest<RequestMetadataT, ReducerMetadataT, EntityT, CallbackT>,
  'request' | 'reducerMetadata' | 'entities' | 'callback'
>;
