import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import upperFirst from 'lodash/upperFirst';
import type React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePrevious } from '@js-modules/common-react-utils';
import type {
  Entity,
  Reducer,
  ReducerMetadata,
} from '@js-modules/common-redux-utils-normalized-reducers';

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
 * Generic confirmation dialog for operations on entities, to be used in an
 * application that implements a normalized reducers architecture.
 * @param props - Component props.
 * @param props.entityTypeName - The entity type name, e.g. user, comment, task.
 * @param props.entityName - The name of the entity record, e.g. John.
 * @param props.actionName - The name of the action performed on the record.
 * @param props.actionRequestId - The request ID of the action dispatched to
 * Redux upon submit.
 * @param props.selectRequests - Selector returning the reducer's requests hit
 * by the dispatched action.
 * @param props.onSubmit - Callback called upon submit.
 * @param props.onClose - Callback called upon closing the dialog.
 * @returns Confirmation dialog.
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
      onClose={(_e, reason) => {
        if (reason === 'escapeKeyDown' && actionRequest?.isPending) {
          return;
        }
        onClose();
      }}
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
              <CircularProgress
                sx={{
                  color: 'primary.contrastText',
                }}
                size={20}
              />
            )
          }
        >
          {actionRequest?.error ? 'Try again' : upperFirst(actionName)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
