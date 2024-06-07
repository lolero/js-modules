import React, { useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  NodeLogEntry,
  useNodeLogEntriesEntity,
  useNodeLogEntriesGetOne,
  useNodeLogEntriesIsMutationPendingOrCompleted,
  useNodeLogEntriesUpdatePartialReducerMetadata,
  useNodeLogEntriesValidateNodeLogEntryUnsaved,
} from '@js-modules/apps-travel-log-common-store-redux';
import { useParams } from 'react-router-dom';
import { useFormUtils } from '@js-modules/web-react-hooks';
import { usePrevious } from '@js-modules/common-react-hooks';
import isUndefined from 'lodash/isUndefined';
import CircularProgress from '@mui/material/CircularProgress';

export const MyLogLogEntryAddEditWorkspaceContentBox: React.FC = () => {
  const { logEntryId } = useParams();

  const nodeLogEntry = useNodeLogEntriesEntity(logEntryId ?? '');

  const { callback: nodeLogEntriesGetOneCallback } = useNodeLogEntriesGetOne();

  const nodeLogEntriesIsMutationPendingOrCompleted =
    useNodeLogEntriesIsMutationPendingOrCompleted();

  const {
    reducerMetadata: { nodeLogEntryUnsaved },
    callback: nodeLogEntriesUpdatePartialReducerMetadataCallback,
  } = useNodeLogEntriesUpdatePartialReducerMetadata();

  const {
    formErrors: formErrorsNodeLogEntryUnsaved,
    validateCallback: validateCallbackNodeLogEntryUnsaved,
  } = useNodeLogEntriesValidateNodeLogEntryUnsaved();
  const formErrorsNodeLogEntryUnsavedPrevious = usePrevious(
    formErrorsNodeLogEntryUnsaved,
  );

  const updateNodeLogEntryUnsavedCallback = useCallback(
    (nodeLogEntryUnsavedUpdated: NonNullable<typeof nodeLogEntryUnsaved>) => {
      nodeLogEntriesUpdatePartialReducerMetadataCallback({
        nodeLogEntryUnsaved: nodeLogEntryUnsavedUpdated,
      });
    },
    [nodeLogEntriesUpdatePartialReducerMetadataCallback],
  );

  const {
    formDataTemp: nodeLogEntryUnsavedTemp,
    changeFieldCallback: changeFieldCallbackLogEntryUnsaved,
    blurFieldCallback: blurFieldCallbackLogEntryUnsaved,
  } = useFormUtils(
    nodeLogEntryUnsaved!,
    formErrorsNodeLogEntryUnsaved,
    validateCallbackNodeLogEntryUnsaved,
    updateNodeLogEntryUnsavedCallback,
  );

  useEffect(() => {
    let nodeLogEntryUnsavedInitial: NodeLogEntry;

    if (logEntryId && !nodeLogEntry) {
      nodeLogEntriesGetOneCallback(logEntryId);
      return;
    }

    if (isUndefined(logEntryId)) {
      nodeLogEntryUnsavedInitial = {
        id: 0,
        title: '',
        description: '',
        createdAt: '',
        __edges__: {
          user: [''],
        },
      };
    }

    nodeLogEntryUnsavedInitial = { ...nodeLogEntry! };

    nodeLogEntriesUpdatePartialReducerMetadataCallback({
      nodeLogEntryUnsaved: nodeLogEntryUnsavedInitial,
    });
  }, [
    logEntryId,
    nodeLogEntriesGetOneCallback,
    nodeLogEntriesUpdatePartialReducerMetadataCallback,
    nodeLogEntry,
  ]);

  useEffect(() => {
    const isFormValidated = !isUndefined(formErrorsNodeLogEntryUnsavedPrevious);
    const shouldValidate = !isFormValidated && !isUndefined(logEntryId);

    if (!shouldValidate) {
      return;
    }

    validateCallbackNodeLogEntryUnsaved();
  }, [
    formErrorsNodeLogEntryUnsavedPrevious,
    logEntryId,
    validateCallbackNodeLogEntryUnsaved,
  ]);

  console.log(
    'nodeLogEntriesIsMutationPendingOrCompleted:',
    nodeLogEntriesIsMutationPendingOrCompleted,
  );
  if (!nodeLogEntryUnsaved) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <TextField
        required
        disabled={nodeLogEntriesIsMutationPendingOrCompleted}
        label="Title"
        value={nodeLogEntryUnsavedTemp?.title ?? ''}
        onChange={changeFieldCallbackLogEntryUnsaved}
        onBlur={blurFieldCallbackLogEntryUnsaved}
        error={!!formErrorsNodeLogEntryUnsaved.title?.length}
        helperText={formErrorsNodeLogEntryUnsaved.title?.join(', ')}
        inputProps={{
          'data-key': 'title',
        }}
      />
      <TextField
        required
        disabled={nodeLogEntriesIsMutationPendingOrCompleted}
        label="Description"
        value={nodeLogEntryUnsavedTemp?.description ?? ''}
        onChange={changeFieldCallbackLogEntryUnsaved}
        onBlur={blurFieldCallbackLogEntryUnsaved}
        error={!!formErrorsNodeLogEntryUnsaved.description?.length}
        helperText={formErrorsNodeLogEntryUnsaved.description?.join(', ')}
        inputProps={{
          'data-key': 'description',
        }}
      />
    </Box>
  );
};
