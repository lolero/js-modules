export enum SearchParamPaginationKeys {
  pageNumber = 'page',
  resultsPerPage = 'results',
}

export type SearchParamsPagination = Record<SearchParamPaginationKeys, number>;
