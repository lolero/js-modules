import React, { useContext, useMemo } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { intersection, isEmpty, orderBy } from 'lodash';
import {
  NodeSegway,
  NodeSegwayDisplay,
  selectNodeSegwaysDisplay,
  UserRoles,
  useStateAuthReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import { useSelector } from 'react-redux';
import { TableBody } from '@mui/material';
import { lightFormat } from 'date-fns';
import { getDaysArrayInTimestampRange } from '@js-modules/apps-segway-rental-utils';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons/faCheckSquare';
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare';
import SegwaysTableRowMenuAdmin from './SegwaysTableRowMenuAdmin';
import SegwaysTableRowMenuUser from './SegwaysTableRowMenuUser';
import SegwaysContext from './SegwaysContext';

type Props = {
  sortDirection: 'asc' | 'desc';
  sortBy: keyof NodeSegway;
};

const SegwaysTableBody: React.FunctionComponent<Props> = ({
  sortDirection,
  sortBy,
}) => {
  const { authUserRole } = useStateAuthReducerMetadata();

  const { filterDates, filterModel, filterColor, filterLocation } =
    useContext(SegwaysContext);

  const nodeSegwaysDisplay = useSelector(selectNodeSegwaysDisplay);

  const nodeSegwaysDisplayWithAvailability = useMemo(() => {
    return nodeSegwaysDisplay.map((nodeSegwayDisplay) => {
      const fromDayDate = filterDates.value[0]
        ? new Date(filterDates.value[0])
        : null;
      const fromDayStr = fromDayDate
        ? lightFormat(fromDayDate, 'yyyy-MM-dd')
        : null;

      const toDayDate = filterDates.value[1]
        ? new Date(filterDates.value[1])
        : null;
      const toDayStr = toDayDate ? lightFormat(toDayDate, 'yyyy-MM-dd') : null;

      let isAvailable = false;
      if (fromDayStr && toDayStr) {
        const filterDaysArray = getDaysArrayInTimestampRange(
          fromDayStr,
          toDayStr,
        );
        isAvailable = isEmpty(
          intersection(filterDaysArray, nodeSegwayDisplay.reservedDays),
        );
      } else if (fromDayStr) {
        isAvailable =
          isEmpty(nodeSegwayDisplay.reservedDays) ||
          !nodeSegwayDisplay.reservedDays.some(
            (reservedDay) => reservedDay > fromDayStr,
          );
      } else if (toDayStr) {
        isAvailable =
          isEmpty(nodeSegwayDisplay.reservedDays) ||
          !nodeSegwayDisplay.reservedDays.some(
            (reservedDay) => reservedDay < toDayStr,
          );
      }

      const nodeSegwayDisplayWithAvailability: NodeSegwayDisplay = {
        ...nodeSegwayDisplay,
        isAvailable,
      };
      return nodeSegwayDisplayWithAvailability;
    });
  }, [filterDates.value, nodeSegwaysDisplay]);

  return (
    <TableBody>
      {orderBy(nodeSegwaysDisplayWithAvailability, sortBy, sortDirection)
        .filter((nodeSegwayDisplay: NodeSegwayDisplay) => {
          return (
            (!filterModel.value ||
              filterModel.value === nodeSegwayDisplay.model) &&
            (!filterColor.value ||
              filterColor.value === nodeSegwayDisplay.color) &&
            (!filterLocation.value ||
              filterLocation.value === nodeSegwayDisplay.location)
          );
        })
        .map((nodeSegwayDisplay: NodeSegwayDisplay) => {
          return (
            <TableRow key={nodeSegwayDisplay.pk}>
              <TableCell>
                <MuiFaIcon
                  icon={
                    nodeSegwayDisplay.isAvailable ? faCheckSquare : faSquare
                  }
                />
              </TableCell>
              <TableCell>{nodeSegwayDisplay.model}</TableCell>
              <TableCell>{nodeSegwayDisplay.color}</TableCell>
              <TableCell>{nodeSegwayDisplay.location}</TableCell>
              <TableCell>{nodeSegwayDisplay.rating}</TableCell>
              <TableCell align="right">
                {authUserRole === UserRoles.admin ? (
                  <SegwaysTableRowMenuAdmin
                    nodeSegwayPk={nodeSegwayDisplay.pk}
                  />
                ) : (
                  <SegwaysTableRowMenuUser
                    nodeSegwayPk={nodeSegwayDisplay.pk}
                  />
                )}
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export const SegwaysTableBodyRaw = SegwaysTableBody;
export const SegwaysTableBodyMemo = React.memo(SegwaysTableBodyRaw);
export default SegwaysTableBodyMemo;
