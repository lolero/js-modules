export type SortOrder = 'asc' | 'desc';

export type EntityUniqueKeyName<
  EntityT,
  UniqueKeyNameOptionsT extends keyof EntityT,
> = keyof Pick<EntityT, UniqueKeyNameOptionsT>;
export type EntityUniqueKeyValue = string | number;

export type UpdateManyEntitiesObjectDto<
  EntityT extends { id: number | string },
  UpdateOnePartialEntityDtoT,
> = Record<EntityT['id'], UpdateOnePartialEntityDtoT>;
