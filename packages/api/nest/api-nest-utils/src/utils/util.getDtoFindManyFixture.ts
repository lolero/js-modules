import { DtoFindMany } from '../dtos/dto.findMany';
import {
  FindManyBooleansDto,
  FindManyOrderDto,
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
  FindManyBooleansDtoT extends FindManyBooleansDto<EntityT> = FindManyBooleansDto<EntityT>,
  FindManyOrderDtoT extends FindManyOrderDto<EntityT> = FindManyOrderDto<EntityT>,
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
      FindManyBooleansDtoT,
      FindManyOrderDtoT
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
  FindManyBooleansDtoT,
  FindManyOrderDtoT
> {
  const requestsDtoQueryParamsFindManyDefault: DtoFindMany<
    EntityT,
    FindManyUniqueKeysDtoT,
    FindManySearchDtoT,
    FindManyRelationsDtoT,
    FindManyDateRangesDtoT,
    FindManyNumberRangesDtoT,
    FindManyStringRangesDtoT,
    FindManyBooleansDtoT,
    FindManyOrderDtoT
  > = {
    pagination: { pageNumber: 1, resultsPerPage: 10 },
  };

  const requestsDtoQueryParamsFindMany: DtoFindMany<
    EntityT,
    FindManyUniqueKeysDtoT,
    FindManySearchDtoT,
    FindManyRelationsDtoT,
    FindManyDateRangesDtoT,
    FindManyNumberRangesDtoT,
    FindManyStringRangesDtoT,
    FindManyBooleansDtoT,
    FindManyOrderDtoT
  > = Object.assign(requestsDtoQueryParamsFindManyDefault, overrides);

  return requestsDtoQueryParamsFindMany;
}
