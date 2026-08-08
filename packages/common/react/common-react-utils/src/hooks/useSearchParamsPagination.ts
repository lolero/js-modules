import { useWebRouter } from '@js-modules/web-react-router';
import type { SearchParamsPagination } from '../types/searchParams.types';
import { SearchParamPaginationKeys } from '../types/searchParams.types';

export function useSearchParamsPagination(): SearchParamsPagination {
  const { searchParams } = useWebRouter();

  const searchParamsPageNumber =
    Number(searchParams.get(SearchParamPaginationKeys.pageNumber)) ?? 1;
  const searchParamsResultsPerPage =
    Number(searchParams.get(SearchParamPaginationKeys.resultsPerPage)) ?? 10;

  const searchParamsPagination: SearchParamsPagination = {
    [SearchParamPaginationKeys.pageNumber]: searchParamsPageNumber,
    [SearchParamPaginationKeys.resultsPerPage]: searchParamsResultsPerPage,
  };

  return searchParamsPagination;
}
