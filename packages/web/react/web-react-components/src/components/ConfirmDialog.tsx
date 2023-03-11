import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { noop, upperFirst } from 'lodash';
import {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';
import { usePrevious } from '@js-modules/common-react-hooks';

export type ConfirmDialogProps = {
  entityTypeName: string;
  entityName: string;
  actionName: string;
  actionRequestId: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  selectRequests: (state: any) => Reducer<ReducerMetadata, Entity>['requests'];
  onSubmit: () => void;
  onClose: () => void;
};

/**
 * Generic confirmation dialog for operations on entities to be used in an
 * application that implements a normalized reducers architecture.
 *
 * @param {string} props.entityTypeName - The entity type name, e.g. user,
 * comment, task, etc.
 *        etc.
 * @param {string} props.entityName - The name of the entity record, e.g. John,
 *        Model BMX 1000, etc.
 * @param {string} props.actionName - The name of the action to be performed on
 *        the entity record
 * @param {string} props.actionRequestId - The request ID of the action which
 *        gets dispatched to Redux upon submit
 * @param {function} props.selectRequests - The selector function that returns
 *        the requests of the reducer which gets hit with the dispatched action
 *        upon submit
 * @param {function} props.onSubmit - The callback function which gets called
 *        upon submit
 * @param {function} props.onClose - The callback function which gets called
 *        upon closing the dialog
 *
 * @returns {React.FunctionComponent} ConfirmDialog React component
 */
export const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = ({
  entityTypeName,
  entityName,
  actionName,
  actionRequestId,
  selectRequests,
  onSubmit,
  onClose,
}) => {
  const entityRequests = useSelector(selectRequests);
  const actionRequest = entityRequests[actionRequestId ?? ''];
  const actionRequestPrevious = usePrevious(actionRequest);

  useEffect(() => {
    if (actionRequestPrevious?.isPending && actionRequest?.isOk) {
      onClose();
    }
  }, [actionRequest?.isOk, actionRequestPrevious?.isPending, onClose]);

  return (
    <Dialog
      open
      onClose={onClose}
      disableEscapeKeyDown={actionRequest?.isPending}
      onBackdropClick={actionRequest?.isPending ? noop : onClose}
    >
      <DialogTitle>
        {upperFirst(actionName)} {entityTypeName}: {entityName}
      </DialogTitle>
      <DialogContent>
        {actionRequest?.error ? (
          <Alert severity="error">
            There was an error trying to {actionName} {entityTypeName}:{' '}
            {entityName}!
          </Alert>
        ) : (
          <Typography>
            Are you sure that you want to {actionName} {entityTypeName}:{' '}
            {entityName}?
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          disabled={actionRequest?.isPending}
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          endIcon={
            actionRequest?.isPending && (
              <Icon className="fas fa-circle-notch fa-spin" color="inherit" />
            )
          }
        >
          {actionRequest?.error ? 'Try again' : upperFirst(actionName)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
