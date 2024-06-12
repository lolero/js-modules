import { DtoFindMany } from '../dtos/dto.findMany';
import {
  FindManyRangesDto,
  FindManyRelationsDto,
  type FindManySearchDto,
  FindManyUniqueKeysDto,
  RequestEntity,
} from '../types/types.requests';

export function utilGetDtoFindManyFixture<
  EntityT extends RequestEntity,
  FindManyUniqueKeysDtoT extends FindManyUniqueKeysDto<EntityT> = FindManyUniqueKeysDto<EntityT>,
  FindManySearchDtoT extends FindManySearchDto<EntityT> = FindManySearchDto<EntityT>,
  FindManyRelationsDtoT extends FindManyRelationsDto<EntityT> = FindManyRelationsDto<EntityT>,
  FindManyDateRangesDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyNumberRangesDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
  FindManyStringRangesDtoT extends FindManyRangesDto<EntityT> = FindManyRangesDto<EntityT>,
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
