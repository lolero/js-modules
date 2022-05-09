import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Skeleton, TableBody } from '@mui/material';

type Props = {
  columns: number;
  rows: number;
};

const MainTableBodySkeleton: React.FunctionComponent<Props> = ({
  columns,
  rows,
}) => {
  return (
    <TableBody>
      {new Array(columns).fill(0).map((row, rowIndex) => {
        const rowKey = `table-skeleton-row-${rowIndex}`;
        return (
          <TableRow key={rowKey}>
            {new Array(rows).fill(0).map((cell, cellIndex) => {
              const cellKey = `table-skeleton-cell-${rowIndex}-${cellIndex}`;
              return (
                <TableCell key={cellKey}>
                  <Skeleton />
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const MainTableBodySkeletonRaw = MainTableBodySkeleton;
export const MainTableBodySkeletonMemo = React.memo(MainTableBodySkeletonRaw);
export default MainTableBodySkeletonMemo;
