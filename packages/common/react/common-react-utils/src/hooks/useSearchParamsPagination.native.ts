import { useMemo } from 'react';
import type { SearchParamsPagination } from '../types/searchParams.types';
import { SearchParamPaginationKeys } from '../types/searchParams.types';

export function useSearchParamsPagination(): SearchParamsPagination {
  const searchParams = useMemo(() => new URLSearchParams(), []);

  const searchParamsPagination = useMemo(() => {
    const searchParamsPageNumber =
      Number(searchParams.get(SearchParamPaginationKeys.pageNumber)) ?? 1;
    const searchParamsResultsPerPage =
      Number(searchParams.get(SearchParamPaginationKeys.resultsPerPage)) ?? 10;

    const searchParamsPaginationTemp: SearchParamsPagination = {
      [SearchParamPaginationKeys.pageNumber]: searchParamsPageNumber,
      [SearchParamPaginationKeys.resultsPerPage]: searchParamsResultsPerPage,
    };

    return searchParamsPaginationTemp;
  }, [searchParams]);

  return searchParamsPagination;
}
