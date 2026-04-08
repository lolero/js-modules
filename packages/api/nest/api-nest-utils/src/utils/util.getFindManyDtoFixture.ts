import type { FindManyDto, RequestEntity } from '../types/types.requests';

export function utilGetFindManyDtoFixture<
  EntityT extends RequestEntity,
  FindManyDtoT extends FindManyDto<EntityT> = FindManyDto<EntityT>,
>(overrides: Partial<FindManyDtoT> = {}): FindManyDtoT {
  const requestsDtoQueryParamsFindManyDefault = {
    pagination: { pageNumber: 1, resultsPerPage: 10 },
  } as FindManyDtoT;

  const requestsDtoQueryParamsFindMany = Object.assign(
    requestsDtoQueryParamsFindManyDefault,
    overrides,
  );

  return requestsDtoQueryParamsFindMany;
}
