export enum SearchParamPaginationKeys {
  pageNumber = 'page',
  resultsPerPage = 'results',
}

export type SearchParamsPagination = Record<SearchParamPaginationKeys, number>;

// Router-agnostic setter contract (matches react-router's `setSearchParams` and
// a Next.js `router.push`-based adapter alike), so consumers inject their own.
export type SetSearchParams = (
  params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
) => void;
