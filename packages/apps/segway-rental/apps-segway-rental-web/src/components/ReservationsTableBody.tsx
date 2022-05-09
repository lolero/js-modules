import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { orderBy } from 'lodash';
import {
  NodeReservationDisplay,
  NodeUser,
  selectNodeReservationsDisplay,
} from '@js-modules/apps-segway-rental-store-redux';
import { useSelector } from 'react-redux';
import { TableBody } from '@mui/material';
import ReservationsTableRowMenu from './ReservationsTableRowMenu';
import ReservationsRatingBox from './ReservationsRatingBox';

type Props = {
  sortDirection: 'asc' | 'desc';
  sortBy: keyof NodeUser;
};

const ReservationsTableBody: React.FunctionComponent<Props> = ({
  sortDirection,
  sortBy,
}) => {
  const nodeReservationsDisplay = useSelector(selectNodeReservationsDisplay);

  return (
    <TableBody>
      {orderBy(nodeReservationsDisplay, sortBy, sortDirection).map(
        (nodeReservationDisplay: NodeReservationDisplay) => {
          return (
            <TableRow key={nodeReservationDisplay.pk}>
              <TableCell>{nodeReservationDisplay.model}</TableCell>
              <TableCell>{nodeReservationDisplay.color}</TableCell>
              <TableCell>{nodeReservationDisplay.location}</TableCell>
              <TableCell>{nodeReservationDisplay.fromTimestamp}</TableCell>
              <TableCell>{nodeReservationDisplay.toTimestamp}</TableCell>
              <TableCell>{nodeReservationDisplay.reservedBy}</TableCell>
              <TableCell>
                <ReservationsRatingBox
                  nodeReservationPk={nodeReservationDisplay.pk}
                />
              </TableCell>
              <TableCell align="right">
                <ReservationsTableRowMenu
                  nodeReservationPk={nodeReservationDisplay.pk}
                />
              </TableCell>
            </TableRow>
          );
        },
      )}
    </TableBody>
  );
};

export const ReservationsTableBodyRaw = ReservationsTableBody;
export const ReservationsTableBodyMemo = React.memo(ReservationsTableBodyRaw);
export default ReservationsTableBodyMemo;
