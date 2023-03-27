import { DtoFindMany } from '../dtos/dto.findMany';
import { DtoFindManySearch } from '../dtos/dto.findManySearch';
import { DtoFindManyDateRanges } from '../dtos/dto.findManyDateRanges';
import { DtoFindManyUniqueKeys } from '../dtos/dto.findManyUniqueKeys';
import {
  FindManyRangesDto,
  FindManyRelationsDto,
  RequestEntity,
} from '../types/types.requests';

export function utilGetDtoFindManyFixture<
  EntityT extends RequestEntity,
  FindManyUniqueKeysDtoT extends DtoFindManyUniqueKeys<EntityT> = DtoFindManyUniqueKeys<EntityT>,
  FindManySearchDtoT extends DtoFindManySearch<EntityT> = DtoFindManySearch<EntityT>,
  FindManyRelationsDtoT extends FindManyRelationsDto<EntityT> = FindManyRelationsDto<EntityT>,
  FindManyDateRangesDtoT extends FindManyRangesDto<EntityT> = DtoFindManyDateRanges,
  FindManyNumberRangesDtoT extends FindManyRangesDto<EntityT> = never,
  FindManyStringRangesDtoT extends FindManyRangesDto<EntityT> = never,
  SortByT extends keyof EntityT = keyof EntityT,
>(
  overrides: Partial<
    DtoFindMany<
      EntityT,
      FindManyUniqueKeysDtoT,
      FindManySearchDtoT,
      FindManyRelationsDtoT,
      FindManyDateRangesDtoT,
      FindManyNumberRangesDtoT,
      FindManyStringRangesDtoT,
      SortByT
    >
  > = {},
): DtoFindMany<
  EntityT,
  FindManyUniqueKeysDtoT,
  FindManySearchDtoT,
  FindManyRelationsDtoT,
  FindManyDateRangesDtoT,
  FindManyNumberRangesDtoT,
  FindManyStringRangesDtoT,
  SortByT
> {
  const requestsDtoQueryParamsFindManyDefault: DtoFindMany<
    EntityT,
    FindManyUniqueKeysDtoT,
    FindManySearchDtoT,
    FindManyRelationsDtoT,
    FindManyDateRangesDtoT,
    FindManyNumberRangesDtoT,
    FindManyStringRangesDtoT,
    SortByT
  > = {
    sortBy: 'test_sort_by' as SortByT,
    sortOrder: 'desc',
    page: 3,
    resultsPerPage: 10,
  };

  const requestsDtoQueryParamsFindMany: DtoFindMany<
    EntityT,
    FindManyUniqueKeysDtoT,
    FindManySearchDtoT,
    FindManyRelationsDtoT,
    FindManyDateRangesDtoT,
    FindManyNumberRangesDtoT,
    FindManyStringRangesDtoT,
    SortByT
  > = Object.assign(requestsDtoQueryParamsFindManyDefault, overrides);

  return requestsDtoQueryParamsFindMany;
}
