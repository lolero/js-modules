export enum FindManyOrderDirection {
  asc = 'asc',
  desc = 'desc',
}

// @typescript-eslint/no-explicit-any disabled because this must be a
// generic type that all entities extend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RequestEntity = Record<string, any>;

export type FindManyUniqueKeysDto<
  EntityT extends RequestEntity = RequestEntity,
> = {
  [uniqueKeyName in keyof EntityT]?: (number | string | undefined)[];
};

export type FindManySearchDto<EntityT extends RequestEntity = RequestEntity> = {
  searchStr: string;
  entityPropNames: (keyof EntityT)[];
};

export type FindManyRange = [number | string | null, number | string | null];

export type FindManyRangesDto<EntityT extends RequestEntity = RequestEntity> = {
  [entityPropName in keyof EntityT]?: FindManyRange;
};

export type FindManyRelationsDto<
  EntityT extends RequestEntity = RequestEntity,
> = {
  [relationName in keyof EntityT]?: FindManyUniqueKeysDto;
};

export type FindManyBooleansDto<EntityT extends RequestEntity = RequestEntity> =
  {
    [entityPropName in keyof EntityT]?: boolean;
  };

export type FindManyOrderItemDto<
  EntityT extends RequestEntity = RequestEntity,
> = {
  entityPropName: keyof EntityT;
  orderDirection: FindManyOrderDirection;
};

export type FindManyPaginationDto = {
  pageNumber: number;
  resultsPerPage: number;
};

export type FindManyDto<EntityT extends RequestEntity = RequestEntity> = {
  uniqueKeys?: FindManyUniqueKeysDto<EntityT>;
  search?: FindManySearchDto<EntityT>;
  relations?: FindManyRelationsDto<EntityT>;
  dateRanges?: FindManyRangesDto<EntityT>;
  numberRanges?: FindManyRangesDto<EntityT>;
  stringRanges?: FindManyRangesDto<EntityT>;
  booleans?: FindManyBooleansDto<EntityT>;
  order?: FindManyOrderItemDto<EntityT>[];
  pagination?: FindManyPaginationDto;
};

export type EntityUniqueKeyName<
  EntityT extends RequestEntity,
  UniqueKeyNameOptionsT extends keyof EntityT,
> = keyof Pick<EntityT, UniqueKeyNameOptionsT>;
export type EntityUniqueKeyValue = string | number;

export type UpdateManyEntitiesObjectDto<UpdateOneEntityDtoT> = Record<
  string,
  UpdateOneEntityDtoT
>;

export type FindManyResponse<EntityT> = {
  entities: EntityT[];
  total: number;
};
