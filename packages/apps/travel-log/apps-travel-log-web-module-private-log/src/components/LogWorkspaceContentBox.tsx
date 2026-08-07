import Box from '@mui/material/Box';
import type React from 'react';
import { useSearchParamLogDate } from '@js-modules/apps-travel-log-common-utils';
import {
  SearchParamPaginationKeys,
  useSearchParamsPagination,
} from '@js-modules/common-react-utils';
import { LogPagination } from './LogPagination';

export function LogWorkspaceContentBox(): React.ReactNode {
  const logDate = useSearchParamLogDate();

  // WATCH: react-compiler-computed-keys
  // Indexed rather than destructured with a computed key.
  const searchParamsPagination = useSearchParamsPagination();
  const pageNumber =
    searchParamsPagination[SearchParamPaginationKeys.pageNumber];

  return (
    <Box>
      <Box>LogWorkspaceContentBox</Box>
      <Box>This is where the log entry cards go</Box>
      <Box>Log date: {logDate}</Box>
      <Box>Page number: {pageNumber}</Box>
      <LogPagination />
    </Box>
  );
}
