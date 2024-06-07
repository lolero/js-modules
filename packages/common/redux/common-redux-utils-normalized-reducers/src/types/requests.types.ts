import { DtoFindMany } from '@js-modules/api-nest-utils/src/dtos/dto.findMany';
import {
  EntityUniqueKeyValue,
  RequestEntity,
} from '@js-modules/api-nest-utils/src/types/types.requests';
import { Entity, RequestMetadata, ReducerMetadata } from './reducers.types';

export interface UpdateWholeReducerMetadataRequestMetadata<
  ReducerMetadataT extends ReducerMetadata,
> extends RequestMetadata {
  wholeReducerMetadata: ReducerMetadataT;
}

export interface UpdatePartialReducerMetadataRequestMetadata<
  ReducerMetadataT extends ReducerMetadata,
> extends RequestMetadata {
  partialReducerMetadata: Partial<ReducerMetadataT>;
}

export interface CreateOneEntityRequestMetadata<EntityT extends Entity>
  extends RequestMetadata {
  entity: EntityT;
}

export interface GetOneEntityRequestMetadata<
  EntityT extends RequestEntity,
  EntityUniqueKeyName extends keyof EntityT,
> extends RequestMetadata {
  uniqueKeyName?: EntityUniqueKeyName;
  uniqueKeyValue: EntityUniqueKeyValue;
}

export interface GetManyEntitiesRequestMetadata<
  EntityT extends RequestEntity,
  findManyDtoT extends DtoFindMany<EntityT>,
> extends RequestMetadata {
  findManyDto?: findManyDtoT;
}

export interface UpdateOneWholeEntityRequestMetadata<EntityT extends Entity>
  extends RequestMetadata {
  entity: EntityT;
}

export interface UpdateManyPartialEntitiesWithPatternRequestMetadata<
  EntityT extends Entity,
> extends RequestMetadata {
  entityPks: string[];
  partialEntity: Partial<EntityT>;
}

export interface UpdateOnePartialEntityRequestMetadata<EntityT extends Entity>
  extends RequestMetadata {
  entityPk: string;
  partialEntity: Partial<EntityT>;
}

export interface DeleteOneEntityRequestMetadata extends RequestMetadata {
  entityPk: string;
}

export interface DeleteManyEntitiesRequestMetadata extends RequestMetadata {
  entityPks: string[];
}
