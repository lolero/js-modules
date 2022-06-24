import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import {
  NodeSegway,
  createNodeSegwaysUpdateOneWholeRequestAction,
  createNodeSegwaysCreateOneRequestAction,
  useNodeSegwaysEntities,
  useNodeSegwaysRequest,
  useStateDialogsReducerMetadata,
  useNodeReservationsRequest,
} from '@js-modules/apps-segway-rental-store-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { noop } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { usePrevious } from '@js-modules/common-react-hooks';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useCloseAllDialogsCallBack } from '../hooks/segwayRentalWebHooks';

const sharedSx = {
  textField: {
    my: '10px',
  },
} as const;

const SegwaysEditDialog: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { segwaysEditDialogMetadata } = useStateDialogsReducerMetadata();
  const nodeSegwayPk = segwaysEditDialogMetadata?.nodeSegwayPk;

  const nodeSegways = useNodeSegwaysEntities();
  const nodeSegway: NodeSegway = useMemo(
    () =>
      nodeSegwayPk
        ? (nodeSegways[nodeSegwayPk] as NodeSegway)
        : {
            id: uuidv4(),
            model: '',
            color: '',
            location: '',
            reservedDays: [],
            __edges__: {
              reservations: [],
            },
          },
    [nodeSegwayPk, nodeSegways],
  );

  const [editSegwayRequestId, setEditSegwayRequestId] = useState<string | null>(
    null,
  );

  const editSegwayRequest = useNodeSegwaysRequest(editSegwayRequestId || '');
  const editSegwayRequestPrevious = usePrevious(editSegwayRequest);

  const isRequestPending = editSegwayRequest?.isPending;

  const closeAllDialogCallback = useCloseAllDialogsCallBack();

  const [model, setModel] = useState<string>(nodeSegway.model);
  const [color, setColor] = useState<string>(nodeSegway.color);
  const [location, setLocation] = useState<string>(nodeSegway.location);

  const changeModelCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setModel(e.target.value);
    },
    [],
  );

  const changeColorCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setColor(e.target.value);
    },
    [],
  );

  const changeLocationCallback = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setLocation(e.target.value);
    },
    [],
  );

  const editSegwayCallback = useCallback(() => {
    const updatedNodeSegway = { ...nodeSegway, model, color, location };
    const editRequestAction = nodeSegwayPk
      ? createNodeSegwaysUpdateOneWholeRequestAction(
          nodeSegwayPk,
          updatedNodeSegway,
        )
      : createNodeSegwaysCreateOneRequestAction(updatedNodeSegway);
    dispatch(editRequestAction);
    setEditSegwayRequestId(editRequestAction.requestId);
  }, [color, dispatch, location, model, nodeSegway, nodeSegwayPk]);

  useEffect(() => {
    if (editSegwayRequestPrevious?.isPending && editSegwayRequest?.isOk) {
      closeAllDialogCallback();
    }
  }, [
    closeAllDialogCallback,
    editSegwayRequest?.isOk,
    editSegwayRequestPrevious?.isPending,
  ]);

  return (
    <Dialog
      open
      onClose={closeAllDialogCallback}
      disableEscapeKeyDown={isRequestPending}
      onBackdropClick={isRequestPending ? noop : closeAllDialogCallback}
    >
      <DialogTitle>
        {nodeSegwayPk ? 'Edit' : 'Create'} segway{' '}
        {nodeSegwayPk ? nodeSegway.model : ''}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={sharedSx.textField}
          id="edit-segway-model"
          label="Model"
          required
          fullWidth
          value={model}
          onChange={changeModelCallback}
        />
        <TextField
          sx={sharedSx.textField}
          id="edit-segway-color"
          label="Color"
          required
          fullWidth
          value={color}
          onChange={changeColorCallback}
        />
        <TextField
          sx={sharedSx.textField}
          id="edit-segway-location"
          label="Location"
          required
          fullWidth
          value={location}
          onChange={changeLocationCallback}
        />
        {editSegwayRequest?.error && (
          <Alert severity="error">
            There was an error trying to {nodeSegwayPk ? 'edit' : 'create'}{' '}
            segway!
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
          disabled={isRequestPending}
          onClick={editSegwayCallback}
          endIcon={
            isRequestPending && (
              <MuiFaIcon icon={faCircleNotch} color="inherit" spin />
            )
          }
        >
          {editSegwayRequest?.error && 'Try again'}
          {!editSegwayRequest?.error && nodeSegwayPk ? 'Edit' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const SegwaysEditDialogRaw = SegwaysEditDialog;
export const SegwaysEditDialogMemo = React.memo(SegwaysEditDialogRaw);
export default SegwaysEditDialogMemo;
