import { RequestsDtoQueryParamsFindMany } from './requests.dto.queryParamsFindMany';

export function getRequestsDtoQueryParamsFindManyFixture<
  FindManyUniqueKeysDtoT,
  SortByT,
>(
  overrides: Partial<
    RequestsDtoQueryParamsFindMany<FindManyUniqueKeysDtoT, SortByT>
  > = {},
): RequestsDtoQueryParamsFindMany<FindManyUniqueKeysDtoT, SortByT> {
  const requestsDtoQueryParamsFindManyDefault: RequestsDtoQueryParamsFindMany<
    FindManyUniqueKeysDtoT,
    SortByT
  > = {
    sortBy: 'test_sort_by' as SortByT,
    sortOrder: 'desc',
    page: 3,
    resultsPerPage: 10,
  };

  const requestsDtoQueryParamsFindMany = Object.assign(
    requestsDtoQueryParamsFindManyDefault,
    overrides,
  );

  return requestsDtoQueryParamsFindMany;
}
