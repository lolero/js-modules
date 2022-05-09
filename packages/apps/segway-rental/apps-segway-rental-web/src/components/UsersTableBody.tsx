import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { entries, orderBy } from 'lodash';
import {
  NodeUser,
  useNodeUsersEntities,
} from '@js-modules/apps-segway-rental-store-redux';
import { TableBody } from '@mui/material';
import UsersTableRowMenu from './UsersTableRowMenu';

type Props = {
  sortDirection: 'asc' | 'desc';
  sortBy: keyof NodeUser;
};

const UsersTableBody: React.FunctionComponent<Props> = ({
  sortDirection,
  sortBy,
}) => {
  const nodeUsers = useNodeUsersEntities();

  return (
    <TableBody>
      {orderBy(
        entries(nodeUsers) as [string, NodeUser][],
        `[1].[${sortBy}]`,
        sortDirection,
      ).map((entry: [string, NodeUser]) => {
        const [nodeUserPk, nodeUser] = entry;
        return (
          <TableRow key={nodeUserPk}>
            <TableCell>{nodeUser.displayName}</TableCell>
            <TableCell>{nodeUser.email}</TableCell>
            <TableCell>{nodeUser.role}</TableCell>
            <TableCell>{nodeUser.lastSignInAt}</TableCell>
            <TableCell align="right">
              <UsersTableRowMenu nodeUserPk={nodeUserPk} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export const UsersTableBodyRaw = UsersTableBody;
export const UsersTableBodyMemo = React.memo(UsersTableBodyRaw);
export default UsersTableBodyMemo;
