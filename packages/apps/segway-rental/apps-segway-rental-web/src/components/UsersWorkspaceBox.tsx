import React from 'react';
import { NodeUser } from '@js-modules/apps-segway-rental-store-redux';
import { Table, TableContainer } from '@mui/material';
import { useTableUtils } from '@js-modules/web-react-hooks';
import MainTableHead from './MainTableHead';
import UsersTableBody from './UsersTableBody';

const UsersWorkspaceBox: React.FunctionComponent = () => {
  const { tableMetadata, onSortCallback } =
    useTableUtils<keyof NodeUser>('displayName');

  return (
    <TableContainer>
      <Table stickyHeader>
        <MainTableHead
          tableHeaders={{
            displayName: 'Name',
            email: 'Email',
            role: 'Role',
            lastSignInAt: 'Last Login',
          }}
          sortDirection={tableMetadata.sortDirection}
          sortBy={tableMetadata.sortBy}
          onSort={onSortCallback}
        />
        <UsersTableBody
          sortDirection={tableMetadata.sortDirection}
          sortBy={tableMetadata.sortBy}
        />
      </Table>
    </TableContainer>
  );
};

export const UsersWorkspaceBoxRaw = UsersWorkspaceBox;
export const UsersWorkspaceBoxMemo = React.memo(UsersWorkspaceBoxRaw);
export default UsersWorkspaceBoxMemo;
