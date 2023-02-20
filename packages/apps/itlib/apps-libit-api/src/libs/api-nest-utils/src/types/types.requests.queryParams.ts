export type SortOrder = 'asc' | 'desc';
export interface RequestsQueryParamsFindMany<SortByT> {
  ids?: string[];
  search?: string;
  sortBy?: SortByT;
  sortOrder?: SortOrder;
  page?: number;
  resultsPerPage?: number;
}
