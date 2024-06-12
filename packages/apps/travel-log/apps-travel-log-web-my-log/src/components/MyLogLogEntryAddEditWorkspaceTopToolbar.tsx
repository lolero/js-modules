import React, { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { MuiFaIcon } from '@js-modules/web-react-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import {
  WebModulesPrivate,
  WebSubModulesMyLog,
} from '@js-modules/apps-travel-log-common-constants';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useNodeLogEntriesCreateOne,
  useNodeLogEntriesUpdateOnePartial,
} from '@js-modules/apps-travel-log-common-store-redux';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';

export const MyLogLogEntryAddEditWorkspaceTopToolbar: React.FC = () => {
  const { logEntryId } = useParams();
  const navigate = useNavigate();

  const {
    request: nodeLogEntriesCreateOneRequest,
    callback: nodeLogEntriesCreateOneCallback,
  } = useNodeLogEntriesCreateOne();

  const {
    request: nodeLogEntriesUpdateOnePartialRequest,
    callback: nodeLogEntriesUpdateOnePartialCallback,
  } = useNodeLogEntriesUpdateOnePartial(logEntryId ?? '');

  const { saveLabel, cancelPath, submitRequest } = useMemo((): {
    saveLabel: string;
    cancelPath: string;
    submitRequest:
      | typeof nodeLogEntriesCreateOneRequest
      | typeof nodeLogEntriesUpdateOnePartialRequest;
  } => {
    if (logEntryId) {
      return {
        saveLabel: 'Save changes',
        cancelPath: `${
          routesMetadataPrivate[WebModulesPrivate.myLog].subRoutes![
            WebSubModulesMyLog.logEntry
          ].path
        }/${logEntryId}`,
        submitRequest: nodeLogEntriesUpdateOnePartialRequest,
      };
    }

    return {
      saveLabel: 'Create',
      cancelPath: routesMetadataPrivate[WebModulesPrivate.myLog].path,
      submitRequest: nodeLogEntriesCreateOneRequest,
    };
  }, [
    logEntryId,
    nodeLogEntriesCreateOneRequest,
    nodeLogEntriesUpdateOnePartialRequest,
  ]);

  const cancelCallback = useCallback(() => {
    // TODO: clear unsaved logEntry
    navigate(cancelPath);
  }, [cancelPath, navigate]);

  const submitCallback = useCallback(() => {
    if (logEntryId) {
      nodeLogEntriesUpdateOnePartialCallback();
    } else {
      nodeLogEntriesCreateOneCallback();
    }
  }, [
    logEntryId,
    nodeLogEntriesCreateOneCallback,
    nodeLogEntriesUpdateOnePartialCallback,
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
          onClick={submitCallback}
        >
          <MuiFaIcon icon={faCheck} />
        </Fab>
      </Box>
    </>
  );
};
