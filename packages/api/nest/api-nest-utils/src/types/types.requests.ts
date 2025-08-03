export type FindManyOrderDirection = 'asc' | 'desc';

export type RequestEntity = object;

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

export type FindManyOrderDto<EntityT extends RequestEntity = RequestEntity> =
  Array<{
    entityPropName: keyof EntityT;
    orderDirection: FindManyOrderDirection;
  }>;

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
