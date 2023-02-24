import { RequestsDtoQueryParamsFindManyIdInt } from './requests.dto.queryParamsFindManyIdInt';

export function getRequestsDtoQueryParamsFindManyFixture<SortByT>(
  overrides: Partial<RequestsDtoQueryParamsFindManyIdInt<SortByT>> = {},
): RequestsDtoQueryParamsFindManyIdInt<SortByT> {
  const requestsDtoQueryParamsFindManyDefault: RequestsDtoQueryParamsFindManyIdInt<SortByT> =
    {
      ids: [1, 2],
      search: 'test_search',
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
