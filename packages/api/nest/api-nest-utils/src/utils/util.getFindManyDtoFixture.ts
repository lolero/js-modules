import { FindManyDto, RequestEntity } from '../types/types.requests';

export function utilGetFindManyDtoFixture<EntityT extends RequestEntity>(
  overrides: Partial<FindManyDto<EntityT>> = {},
): FindManyDto<EntityT> {
  const requestsDtoQueryParamsFindManyDefault: FindManyDto<EntityT> = {
    pagination: { pageNumber: 1, resultsPerPage: 10 },
  };

  const requestsDtoQueryParamsFindMany: FindManyDto<EntityT> = Object.assign(
    requestsDtoQueryParamsFindManyDefault,
    overrides,
  );

  return requestsDtoQueryParamsFindMany;
}
