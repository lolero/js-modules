import React, { useCallback, useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import {
  WebModulesPrivate,
  WebSubModulesMyLog,
} from '@js-modules/apps-travel-log-common-constants';
import { useNavigate, useParams } from 'react-router-dom';
import {
  nodeLogEntryUnsavedEmpty,
  useNodeLogEntriesCreateOne,
  useNodeLogEntriesEntity,
  useNodeLogEntriesIsMutationPendingOrCompleted,
  useNodeLogEntriesReducerMetadata,
  useNodeLogEntriesUpdateOneWhole,
} from '@js-modules/apps-travel-log-common-store-redux';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import { MyLogLogEntryAddEditContext } from './MyLogLogEntryAddEditContext';

export const MyLogLogEntryAddEditWorkspaceTopToolbar: React.FC = () => {
  const { nodeLogEntryUnsavedFormValidator } = useContext(
    MyLogLogEntryAddEditContext,
  );

  const navigate = useNavigate();

  const { logEntryId } = useParams();

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

  const { saveLabel, goBackPath, submitRequest } = useMemo((): {
    saveLabel: string;
    goBackPath: string;
    submitRequest:
      | typeof nodeLogEntriesCreateOneRequest
      | typeof nodeLogEntriesUpdateOneWholeRequest;
  } => {
    if (logEntryId) {
      return {
        saveLabel: 'Save changes',
        goBackPath: `${
          routesMetadataPrivate[WebModulesPrivate.myLog].subRoutes![
            WebSubModulesMyLog.logEntry
          ].path
        }/${logEntryId}`,
        submitRequest: nodeLogEntriesUpdateOneWholeRequest,
      };
    }

    return {
      saveLabel: 'Create',
      goBackPath: routesMetadataPrivate[WebModulesPrivate.myLog].path,
      submitRequest: nodeLogEntriesCreateOneRequest,
    };
  }, [
    logEntryId,
    nodeLogEntriesCreateOneRequest,
    nodeLogEntriesUpdateOneWholeRequest,
  ]);

  const cancelCallback = useCallback(() => {
    navigate(goBackPath);
  }, [goBackPath, navigate]);

  const submitCallback = useCallback(() => {
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

    navigate(goBackPath);
  }, [
    goBackPath,
    logEntryId,
    navigate,
    nodeLogEntriesCreateOneCallback,
    nodeLogEntriesUpdateOneWholeCallback,
    nodeLogEntryUnsaved,
    validateCallbackNodeLogEntryUnsaved,
  ]);

  const isSubmitButtonDisabled = useMemo(() => {
    const isUnsavedChanges =
      (isUndefined(logEntryId) &&
        !isNull(nodeLogEntryUnsaved) &&
        !isEqual(nodeLogEntryUnsaved, nodeLogEntryUnsavedEmpty)) ||
      (!isUndefined(logEntryId) &&
        !isUndefined(nodeLogEntry) &&
        !isNull(nodeLogEntryUnsaved) &&
        !isEqual(nodeLogEntryUnsaved, nodeLogEntry));

    const isSubmitButtonDisabledTemp =
      isNull(nodeLogEntryUnsaved) ||
      (!isUndefined(logEntryId) && isUndefined(nodeLogEntry)) ||
      nodeLogEntriesIsMutationPendingOrCompleted ||
      !isUnsavedChanges;

    return isSubmitButtonDisabledTemp;
  }, [
    logEntryId,
    nodeLogEntriesIsMutationPendingOrCompleted,
    nodeLogEntry,
    nodeLogEntryUnsaved,
  ]);

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
            <CircularProgress size={40} />
          ) : (
            <MuiFaIcon icon={faCheck} />
          )}
        </Fab>
      </Box>
    </>
  );
};
