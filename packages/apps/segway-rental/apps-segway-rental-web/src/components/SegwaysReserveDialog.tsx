import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStateDialogsMetadata,
  NodeReservation,
  createNodeReservationsCreateOneRequestAction,
  useNodeSegwaysEntity,
  NodeSegway,
  useNodeReservationsRequest,
} from '@js-modules/apps-segway-rental-store-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { intersection, isEmpty, noop, reverse } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { lightFormat } from 'date-fns';
import { getDaysArrayInTimestampRange } from '@js-modules/apps-segway-rental-utils';
import { usePrevious } from '@js-modules/common-react-hooks';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useCloseAllDialogsCallBack } from '../hooks/segwayRentalWebHooks';

const sharedSx = {
  textField: {
    my: '10px',
  },
} as const;

const SegwaysReserveDialog: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { segwaysReserveDialogMetadata } = useSelector(
    selectStateDialogsMetadata,
  );
  const nodeSegwayPk = segwaysReserveDialogMetadata?.nodeSegwayPk || '';
  const nodeUserPk = segwaysReserveDialogMetadata?.nodeUserPk || '';

  const nodeSegway = useNodeSegwaysEntity(nodeSegwayPk) as NodeSegway;

  const [reserveSegwayRequestId, setReserveSegwayRequestId] = useState<
    string | null
  >(null);

  const reserveSegwayRequest = useNodeReservationsRequest(
    reserveSegwayRequestId ?? '',
  );
  const reserveSegwayRequestPrevious = usePrevious(reserveSegwayRequest);

  const isRequestPending = reserveSegwayRequest?.isPending;

  const closeAllDialogCallback = useCloseAllDialogsCallBack();

  const [timestampRange, setTimestampRange] = useState<DateRange<string>>([
    null,
    null,
  ]);

  const shouldDisableDateCallback = useCallback(
    (dayTimestamp: string) => {
      const dayDate = new Date(dayTimestamp);
      const dayStr = lightFormat(dayDate, 'yyyy-MM-dd');

      if (timestampRange.includes(null)) {
        if (timestampRange[0]) {
          const fromDayDate = new Date(timestampRange[0]);
          const fromDayStr = lightFormat(fromDayDate, 'yyyy-MM-dd');
          const maxDayStr = nodeSegway.reservedDays.find(
            (reservedDayStr) => reservedDayStr >= fromDayStr,
          );

          return !maxDayStr
            ? dayStr < fromDayStr
            : dayStr < fromDayStr || dayStr >= maxDayStr;
        }
        if (timestampRange[1]) {
          const toDayDate = new Date(timestampRange[1]);
          const toDayStr = lightFormat(toDayDate, 'yyyy-MM-dd');
          const minDayStr = reverse([...nodeSegway.reservedDays]).find(
            (reservedDayStr) => reservedDayStr <= toDayStr,
          );

          return !minDayStr
            ? dayStr > toDayStr
            : dayStr > toDayStr || dayStr <= minDayStr;
        }
      }

      return nodeSegway.reservedDays.includes(dayStr);
    },
    [nodeSegway.reservedDays, timestampRange],
  );

  const changeDateRangeCallback = useCallback(
    (newTimestampRange: DateRange<string>) => {
      setTimestampRange(newTimestampRange);
    },
    [],
  );

  const reserveSegwayCallback = useCallback(() => {
    if (!timestampRange[0] || !timestampRange[1]) {
      return;
    }

    const nodeReservation: NodeReservation = {
      id: uuidv4(),
      location: nodeSegway.location,
      fromTimestamp: lightFormat(new Date(timestampRange[0]), 'yyyy-MM-dd'),
      toTimestamp: lightFormat(new Date(timestampRange[1]), 'yyyy-MM-dd'),
      rating: null,
      __edges__: {
        segway: [nodeSegwayPk],
        user: [nodeUserPk],
      },
    };

    const reserveSegwayRequestAction =
      createNodeReservationsCreateOneRequestAction(nodeReservation);
    dispatch(reserveSegwayRequestAction);
    setReserveSegwayRequestId(reserveSegwayRequestAction.requestId);
  }, [dispatch, nodeSegway.location, nodeSegwayPk, nodeUserPk, timestampRange]);

  useEffect(() => {
    if (timestampRange[0] && timestampRange[1]) {
      const daysRange = getDaysArrayInTimestampRange(
        timestampRange[0],
        timestampRange[1],
      );

      const blockedDays = intersection(nodeSegway.reservedDays, daysRange);

      if (!isEmpty(blockedDays)) {
        setTimestampRange([null, null]);
      }
    }
  }, [nodeSegway.reservedDays, timestampRange]);

  useEffect(() => {
    if (reserveSegwayRequestPrevious?.isPending && reserveSegwayRequest?.isOk) {
      closeAllDialogCallback();
    }
  }, [
    closeAllDialogCallback,
    reserveSegwayRequest?.isOk,
    reserveSegwayRequestPrevious?.isPending,
  ]);

  return (
    <Dialog
      open
      onClose={closeAllDialogCallback}
      disableEscapeKeyDown={isRequestPending}
      onBackdropClick={isRequestPending ? noop : closeAllDialogCallback}
    >
      <DialogTitle>Reserve segway {nodeSegway.model}</DialogTitle>
      <DialogContent>
        <TextField
          sx={sharedSx.textField}
          id="edit-segway-model"
          label="Model"
          required
          fullWidth
          value={nodeSegway.model}
          disabled
        />
        <TextField
          sx={sharedSx.textField}
          id="edit-segway-color"
          label="Color"
          required
          fullWidth
          value={nodeSegway.color}
          disabled
        />
        <TextField
          sx={sharedSx.textField}
          id="edit-segway-location"
          label="Location"
          required
          fullWidth
          value={nodeSegway.location}
          disabled
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateRangePicker
            mask="____.__.__"
            clearable
            startText="Pickup"
            endText="Drop off"
            value={timestampRange}
            disablePast
            inputFormat="yyyy.MM.dd"
            shouldDisableDate={shouldDisableDateCallback}
            onChange={changeDateRangeCallback}
            renderInput={(startProps, endProps) => (
              <Box
                sx={{
                  ...sharedSx.textField,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <TextField {...endProps} />
              </Box>
            )}
          />
        </LocalizationProvider>
        {reserveSegwayRequest?.error && (
          <Alert severity="error">
            There was an error trying to reserve segway ${nodeSegway.model}!
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          disabled={isRequestPending}
          onClick={closeAllDialogCallback}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={
            isRequestPending || !timestampRange[0] || !timestampRange[1]
          }
          onClick={reserveSegwayCallback}
          endIcon={
            isRequestPending && (
              <MuiFaIcon icon={faCircleNotch} color="inherit" spin />
            )
          }
        >
          {reserveSegwayRequest?.error ? 'Try again' : 'Reserve'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const SegwaysReserveDialogRaw = SegwaysReserveDialog;
export const SegwaysReserveDialogMemo = React.memo(SegwaysReserveDialogRaw);
export default SegwaysReserveDialogMemo;
