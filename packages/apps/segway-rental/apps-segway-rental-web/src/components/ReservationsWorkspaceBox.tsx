import React from 'react';
import { NodeUser } from '@js-modules/apps-segway-rental-store-redux';
import { Table, TableContainer } from '@mui/material';
import { useTableUtils } from '@js-modules/web-react-hooks';
import MainTableHead from './MainTableHead';
import ReservationsTableBody from './ReservationsTableBody';

const ReservationsWorkspaceBox: React.FunctionComponent = () => {
  const { tableMetadata, onSortCallback } =
    useTableUtils<keyof NodeUser>('model');

  return (
    <TableContainer>
      <Table stickyHeader>
        <MainTableHead
          tableHeaders={{
            model: 'Model',
            color: 'Color',
            location: 'Location',
            fromTimestamp: 'From',
            toTimestamp: 'To',
            reservedBy: 'Reserved By',
            rating: 'Rating',
          }}
          sortDirection={tableMetadata.sortDirection}
          sortBy={tableMetadata.sortBy}
          onSort={onSortCallback}
        />
        <ReservationsTableBody
          sortDirection={tableMetadata.sortDirection}
          sortBy={tableMetadata.sortBy}
        />
      </Table>
    </TableContainer>
  );
};

export const ReservationsWorkspaceBoxRaw = ReservationsWorkspaceBox;
export const ReservationsWorkspaceBoxMemo = React.memo(
  ReservationsWorkspaceBoxRaw,
);
export default ReservationsWorkspaceBoxMemo;
