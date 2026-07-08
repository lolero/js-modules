import Pagination from '@mui/material/Pagination';
import type React from 'react';
import { useCallback } from 'react';
import {
  SearchParamPaginationKeys,
  useSearchParamsPagination,
} from '@js-modules/common-react-utils';
import { useWebRouter } from '@js-modules/web-react-router';

export const LogPagination: React.FC = () => {
  const { setSearchParams } = useWebRouter();

  const { [SearchParamPaginationKeys.pageNumber]: pageNumber } =
    useSearchParamsPagination();

  const changePageNumberCallback = useCallback(
    (_e: React.ChangeEvent<unknown>, pageNumberNew: number) => {
      setSearchParams((searchParamsPrevious) => {
        searchParamsPrevious.set(
          SearchParamPaginationKeys.pageNumber,
          `${pageNumberNew}`,
        );
        return searchParamsPrevious;
      });
    },
    [setSearchParams],
  );

  return (
    <Pagination
      sx={{
        display: 'inline-flex',
      }}
      count={2}
      page={pageNumber}
      color="primary"
      onChange={changePageNumberCallback}
    />
  );
};
