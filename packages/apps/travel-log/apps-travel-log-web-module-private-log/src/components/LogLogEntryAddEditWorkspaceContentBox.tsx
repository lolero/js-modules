import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import type React from 'react';
import { useCallback, useContext, useEffect } from 'react';
import {
  NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
  NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
  nodeLogEntryUnsavedEmpty,
  useNodeLogEntriesClearReducerRequests,
  useNodeLogEntriesIsMutationPendingOrCompleted,
  useNodeLogEntriesUpdatePartialReducerMetadata,
} from '@js-modules/apps-travel-log-common-store-redux';
import { usePrevious } from '@js-modules/common-react-utils';
import { useFormUtilsWeb } from '@js-modules/web-react-mui';
import { useWebParams } from '@js-modules/web-react-router';
import { LogLogEntryAddEditContext } from './LogLogEntryAddEditContext';

export function LogLogEntryAddEditWorkspaceContentBox(): React.ReactNode {
  const { nodeLogEntryUnsavedFormValidator } = useContext(
    LogLogEntryAddEditContext,
  );

  const { logEntryId } = useWebParams();

  const nodeLogEntriesIsMutationPendingOrCompleted =
    useNodeLogEntriesIsMutationPendingOrCompleted();

  const { callback: nodeLogEntriesClearReducerRequestsCallback } =
    useNodeLogEntriesClearReducerRequests();

  const {
    reducerMetadata: { nodeLogEntryUnsaved },
    callback: nodeLogEntriesUpdatePartialReducerMetadataCallback,
  } = useNodeLogEntriesUpdatePartialReducerMetadata();

  const {
    formErrors: formErrorsNodeLogEntryUnsaved,
    validateCallback: validateCallbackNodeLogEntryUnsaved,
  } = nodeLogEntryUnsavedFormValidator;
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
  } = useFormUtilsWeb(
    nodeLogEntryUnsaved ?? nodeLogEntryUnsavedEmpty,
    formErrorsNodeLogEntryUnsaved,
    validateCallbackNodeLogEntryUnsaved,
    updateNodeLogEntryUnsavedCallback,
  );

  useEffect(() => {
    const isFormValidated = !isUndefined(formErrorsNodeLogEntryUnsavedPrevious);
    const shouldValidate =
      !isFormValidated &&
      !isUndefined(logEntryId) &&
      !isNull(nodeLogEntryUnsaved);

    if (!shouldValidate) {
      return;
    }

    validateCallbackNodeLogEntryUnsaved();
  }, [
    formErrorsNodeLogEntryUnsavedPrevious,
    logEntryId,
    nodeLogEntryUnsaved,
    validateCallbackNodeLogEntryUnsaved,
  ]);

  useEffect(() => {
    function onUnmount(): void {
      nodeLogEntriesClearReducerRequestsCallback([
        NODE_LOG_ENTRIES__CREATE_ONE__REQUEST_ID,
        NODE_LOG_ENTRIES__UPDATE_ONE_WHOLE__REQUEST_ID,
      ]);
      nodeLogEntriesUpdatePartialReducerMetadataCallback({
        nodeLogEntryUnsaved: null,
      });
    }
    return onUnmount;
  }, [
    nodeLogEntriesClearReducerRequestsCallback,
    nodeLogEntriesUpdatePartialReducerMetadataCallback,
  ]);

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
        slotProps={{ htmlInput: { 'data-key': 'title' } }}
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
        slotProps={{ htmlInput: { 'data-key': 'description' } }}
      />
    </Box>
  );
}
