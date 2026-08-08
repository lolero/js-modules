import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Fab from '@mui/material/Fab';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import type React from 'react';
import { useContext } from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  nodeLogEntryUnsavedEmpty,
  useNodeLogEntriesCreateOne,
  useNodeLogEntriesEntity,
  useNodeLogEntriesIsMutationPendingOrCompleted,
  useNodeLogEntriesReducerMetadata,
  useNodeLogEntriesUpdateOneWhole,
} from '@js-modules/apps-travel-log-common-store-redux';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { useWebParams, useWebRouter } from '@js-modules/web-react-router';
import { LogLogEntryAddEditContext } from './LogLogEntryAddEditContext';

export function LogLogEntryAddEditWorkspaceTopToolbar(): React.ReactNode {
  const { nodeLogEntryUnsavedFormValidator } = useContext(
    LogLogEntryAddEditContext,
  );

  const { pathPush } = useWebRouter();

  const { logEntryId } = useWebParams();

  const nodeLogEntriesIsMutationPendingOrCompleted =
    useNodeLogEntriesIsMutationPendingOrCompleted();

  const { nodeLogEntryUnsaved } = useNodeLogEntriesReducerMetadata();

  const nodeLogEntry = useNodeLogEntriesEntity(logEntryId ?? '');

  const {
    request: nodeLogEntriesCreateOneRequest,
    callback: nodeLogEntriesCreateOneCallback,
  } = useNodeLogEntriesCreateOne();

  const {
    request: nodeLogEntriesUpdateOneWholeRequest,
    callback: nodeLogEntriesUpdateOneWholeCallback,
  } = useNodeLogEntriesUpdateOneWhole();

  const { validateCallback: validateCallbackNodeLogEntryUnsaved } =
    nodeLogEntryUnsavedFormValidator;

  let saveLabel = 'Create';
  let goBackPath = routesMetadataPrivate[WebModulesPrivate.log].path;
  let submitRequest:
    | typeof nodeLogEntriesCreateOneRequest
    | typeof nodeLogEntriesUpdateOneWholeRequest =
    nodeLogEntriesCreateOneRequest;
  if (logEntryId) {
    saveLabel = 'Save changes';
    goBackPath = `${
      routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
        WebSubModulesLog.logEntry
      ].path
    }/${logEntryId}`;
    submitRequest = nodeLogEntriesUpdateOneWholeRequest;
  }

  function cancelCallback(): void {
    pathPush(goBackPath);
  }

  function submitCallback(): void {
    const formErrorsNodeLogEntryUnsavedTemp =
      validateCallbackNodeLogEntryUnsaved();

    if (!isEmpty(formErrorsNodeLogEntryUnsavedTemp)) {
      return;
    }

    if (logEntryId) {
      nodeLogEntriesUpdateOneWholeCallback(nodeLogEntryUnsaved!);
    } else {
      nodeLogEntriesCreateOneCallback(nodeLogEntryUnsaved!);
    }

    pathPush(goBackPath);
  }

  const isUnsavedChanges =
    (isUndefined(logEntryId) &&
      !isNull(nodeLogEntryUnsaved) &&
      !isEqual(nodeLogEntryUnsaved, nodeLogEntryUnsavedEmpty)) ||
    (!isUndefined(logEntryId) &&
      !isUndefined(nodeLogEntry) &&
      !isNull(nodeLogEntryUnsaved) &&
      !isEqual(nodeLogEntryUnsaved, nodeLogEntry));

  const isSubmitButtonDisabled =
    isNull(nodeLogEntryUnsaved) ||
    (!isUndefined(logEntryId) && isUndefined(nodeLogEntry)) ||
    nodeLogEntriesIsMutationPendingOrCompleted ||
    !isUnsavedChanges;

  return (
    <>
      <Box />
      <Box
        sx={{
          display: 'flex',
          gap: 1,
        }}
      >
        <Fab title="Cancel" size="small" onClick={cancelCallback}>
          <MuiFaIcon icon={faXmark} />
        </Fab>
        <Fab
          title={saveLabel}
          color="primary"
          size="small"
          disabled={isSubmitButtonDisabled}
          onClick={submitCallback}
        >
          {submitRequest?.isPending ? (
            <CircularProgress />
          ) : (
            <MuiFaIcon icon={faCheck} />
          )}
        </Fab>
      </Box>
    </>
  );
}
