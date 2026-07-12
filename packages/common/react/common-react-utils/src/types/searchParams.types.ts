import type { Enum } from '@js-modules/common-utils-general';

export const SearchParamPaginationKeys = {
  pageNumber: 'page',
  resultsPerPage: 'results',
} as const;
export type SearchParamPaginationKeys = Enum<typeof SearchParamPaginationKeys>;

export type SearchParamsPagination = Record<SearchParamPaginationKeys, number>;

// Router-agnostic setter contract (matches react-router's `setSearchParams` and
// a Next.js `router.push`-based adapter alike), so consumers inject their own.
export type SetSearchParams = (
  params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
) => void;
