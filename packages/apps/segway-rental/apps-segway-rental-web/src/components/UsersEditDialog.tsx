import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  UserRoles,
  createNodeUsersUpdateOneRoleRequestAction,
  useNodeUsersEntity,
  useNodeUsersRequest,
  useStateDialogsReducerMetadata,
} from '@js-modules/apps-segway-rental-store-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { keys, noop } from 'lodash';
import { Autocomplete } from '@mui/material';
import { usePrevious } from '@js-modules/common-react-hooks';
import { autocompleteSx } from '@js-modules/web-styles-material-ui';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons/faCircleNotch';
import { useCloseAllDialogsCallBack } from '../hooks/segwayRentalWebHooks';

const sharedSx = {
  textField: {
    my: '10px',
  },
} as const;

const UsersEditDialog: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const { usersEditDialogMetadata } = useStateDialogsReducerMetadata();
  const nodeUserPk = usersEditDialogMetadata?.nodeUserPk;

  const nodeUser = useNodeUsersEntity(nodeUserPk ?? '');

  const [editUserRequestId, setEditUserRequestId] = useState<string | null>(
    null,
  );

  const editUserRequest = useNodeUsersRequest(editUserRequestId ?? '');
  const editUserRequestPrevious = usePrevious(editUserRequest);

  const isRequestPending = editUserRequest?.isPending;

  const closeAllDialogCallback = useCloseAllDialogsCallBack();

  const [role, setRole] = useState<string | undefined>(nodeUser?.role);

  const changeRoleCallback = useCallback(
    (e: React.SyntheticEvent<Element, Event>, newRoleValue) => {
      setRole(newRoleValue);
    },
    [],
  );

  const editUserCallback = useCallback(() => {
    const editRequestAction = createNodeUsersUpdateOneRoleRequestAction(
      nodeUserPk ?? '',
      role as UserRoles,
    );
    dispatch(editRequestAction);
    setEditUserRequestId(editRequestAction.requestId);
  }, [dispatch, nodeUserPk, role]);

  useEffect(() => {
    if (editUserRequestPrevious?.isPending && editUserRequest?.isOk) {
      closeAllDialogCallback();
    }
  }, [
    closeAllDialogCallback,
    editUserRequest?.isOk,
    editUserRequestPrevious?.isPending,
  ]);

  return (
    <Dialog
      open
      onClose={closeAllDialogCallback}
      disableEscapeKeyDown={isRequestPending}
      onBackdropClick={isRequestPending ? noop : closeAllDialogCallback}
    >
      <DialogTitle>Edit user {nodeUser?.displayName}</DialogTitle>
      <DialogContent>
        <TextField
          sx={sharedSx.textField}
          id="edit-user-display-name"
          label="Name"
          required
          fullWidth
          disabled
          value={nodeUser?.displayName}
        />
        <TextField
          sx={sharedSx.textField}
          id="edit-user-email"
          label="Email"
          required
          fullWidth
          disabled
          value={nodeUser?.email}
        />
        <Autocomplete
          sx={autocompleteSx}
          id="edit-user-role"
          fullWidth
          disableClearable
          options={keys(UserRoles)}
          getOptionLabel={(option) => option}
          value={role}
          disabled={isRequestPending}
          onChange={changeRoleCallback}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Role"
              required
            />
          )}
        />
        {editUserRequest?.error && (
          <Alert severity="error">
            There was an error trying to edit user: {nodeUser?.displayName}!
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
          onClick={editUserCallback}
          endIcon={
            isRequestPending && (
              <MuiFaIcon icon={faCircleNotch} color="inherit" spin />
            )
          }
        >
          {editUserRequest?.error ? 'Try again' : 'Edit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const UsersEditDialogRaw = UsersEditDialog;
export const UsersEditDialogMemo = React.memo(UsersEditDialogRaw);
export default UsersEditDialogMemo;
