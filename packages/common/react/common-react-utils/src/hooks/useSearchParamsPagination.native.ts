import { useMemo } from 'react';
import type { SearchParamsPagination } from '../types/searchParams.types';
import { SearchParamPaginationKeys } from '../types/searchParams.types';

/**
 * Native counterpart of the web `useSearchParamsPagination` — native has no URL
 * search params, so this resolves to the defaults.
 * @returns The pagination search params.
 */
export function useSearchParamsPagination(): SearchParamsPagination {
  // WHY: react-compiler-hookless-hook
  const searchParams = useMemo(() => new URLSearchParams(), []);

  // WHY: react-compiler-hookless-hook
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
