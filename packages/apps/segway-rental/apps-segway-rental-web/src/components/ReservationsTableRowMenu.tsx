import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  createNodeReservationsDeleteManyRequestAction,
  createStateDialogsUpdateWholeReducerMetadataRequestAction,
  selectNodeReservationsRequests,
  useNodeReservationsEntity,
  NodeReservation,
  useNodeSegwaysEntity,
  NodeSegway,
} from '@js-modules/apps-segway-rental-store-redux';
import Button from '@mui/material/Button';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons/faCalendarTimes';
import { useCloseAllDialogsCallBack } from '../hooks/segwayRentalWebHooks';

type Props = {
  nodeReservationPk: string;
};

const ReservationsTableRowMenuUser: React.FunctionComponent<Props> = ({
  nodeReservationPk,
}) => {
  const dispatch = useDispatch();

  const nodeReservation = useNodeReservationsEntity(
    nodeReservationPk,
  ) as NodeReservation;

  const nodeSegwayPk = nodeReservation.__edges__.segway[0];
  const nodeSegway = useNodeSegwaysEntity(nodeSegwayPk) as NodeSegway;

  const closeAllDialogsCallBack = useCloseAllDialogsCallBack();

  const deleteReservationCallback = useCallback(() => {
    const deleteRequestAction = createNodeReservationsDeleteManyRequestAction([
      nodeReservationPk,
    ]);
    const openConfirmDialogRequestAction =
      createStateDialogsUpdateWholeReducerMetadataRequestAction({
        confirmDialogMetadata: {
          entityTypeName: 'reservation',
          entityName: `${nodeSegway.model} (${nodeSegway.color}) at ${nodeSegway.location} from ${nodeReservation.fromTimestamp} to ${nodeReservation.toTimestamp}`,
          actionName: 'Delete Reservation',
          actionRequestId: deleteRequestAction.requestId,
          selectRequests: selectNodeReservationsRequests,
          onSubmit: () => {
            dispatch(deleteRequestAction);
          },
          onClose: closeAllDialogsCallBack,
        },
      });
    dispatch(openConfirmDialogRequestAction);
  }, [
    closeAllDialogsCallBack,
    dispatch,
    nodeSegway.color,
    nodeSegway.location,
    nodeSegway.model,
    nodeReservation.fromTimestamp,
    nodeReservation.toTimestamp,
    nodeReservationPk,
  ]);

  return (
    <Button
      variant="contained"
      startIcon={<MuiFaIcon icon={faCalendarTimes} />}
      onClick={deleteReservationCallback}
    >
      Delete Reservation
    </Button>
  );
};

export const ReservationsTableRowMenuUserRaw = ReservationsTableRowMenuUser;
export const ReservationsTableRowMenuUserMemo = React.memo(
  ReservationsTableRowMenuUserRaw,
);
export default ReservationsTableRowMenuUserMemo;
