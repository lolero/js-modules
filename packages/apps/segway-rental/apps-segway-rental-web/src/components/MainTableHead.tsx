import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { keys } from 'lodash';
import { NodeUser } from '@js-modules/apps-segway-rental-store-redux';

type Props = {
  tableHeaders: Record<string, string>;
  sortDirection: 'asc' | 'desc';
  sortBy: keyof NodeUser;
  onSort: (column: keyof NodeUser) => void;
};

const MainTableHead: React.FunctionComponent<Props> = ({
  tableHeaders,
  onSort,
  sortBy,
  sortDirection,
}) => {
  return (
    <TableHead>
      <TableRow>
        {keys(tableHeaders).map((column) => (
          <TableCell key={column}>
            <TableSortLabel
              active={sortBy === column}
              direction={sortBy === column ? sortDirection : 'asc'}
              onClick={(): void => onSort(column)}
            >
              {tableHeaders[column]}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export const MainTableHeadRaw = MainTableHead;
export const MainTableHeadMemo = React.memo(MainTableHeadRaw);
export default MainTableHeadMemo;
