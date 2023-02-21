import { RequestsDtoQueryParamsFindMany } from './requests.dto.queryParamsFindMany';

export function getRequestsDtoQueryParamsFindManyFixture<SortByT>(
  overrides: Partial<RequestsDtoQueryParamsFindMany<SortByT>> = {},
): RequestsDtoQueryParamsFindMany<SortByT> {
  const requestsDtoQueryParamsFindManyDefault: RequestsDtoQueryParamsFindMany<SortByT> =
    {
      ids: ['test_id_1', 'test_id_2'],
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
