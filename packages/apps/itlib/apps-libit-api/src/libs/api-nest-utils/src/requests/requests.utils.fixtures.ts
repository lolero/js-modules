import { RequestsDtoQueryParamsFindMany } from './requests.dto.queryParamsFindMany';

export function getRequestsDtoQueryParamsFindManyFixture(
  overrides: Partial<RequestsDtoQueryParamsFindMany<string>> = {},
): RequestsDtoQueryParamsFindMany<string> {
  const requestsDtoQueryParamsFindManyDefault: RequestsDtoQueryParamsFindMany<string> =
    {
      ids: ['test_id_1', 'test_id_2'],
      search: 'test_search',
      sortBy: 'test_sort_by',
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
