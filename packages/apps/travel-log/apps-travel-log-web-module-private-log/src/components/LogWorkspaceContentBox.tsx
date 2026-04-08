import Box from '@mui/material/Box';
import type React from 'react';
import { useSearchParamLogDate } from '@js-modules/apps-travel-log-common-utils';
import {
  SearchParamPaginationKeys,
  useSearchParamsPagination,
} from '@js-modules/common-react-utils';
import { LogPagination } from './LogPagination';

export const LogWorkspaceContentBox: React.FC = () => {
  const logDate = useSearchParamLogDate();

  const { [SearchParamPaginationKeys.pageNumber]: pageNumber } =
    useSearchParamsPagination();

  return (
    <Box>
      <Box>LogWorkspaceContentBox</Box>
      <Box>This is where the log entry cards go</Box>
      <Box>Log date: {logDate}</Box>
      <Box>Page number: {pageNumber}</Box>
      <LogPagination />
    </Box>
  );
};
