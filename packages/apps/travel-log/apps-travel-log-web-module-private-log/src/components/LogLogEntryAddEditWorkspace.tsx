import CircularProgress from '@mui/material/CircularProgress';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import type React from 'react';
import { useEffect } from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import type { NodeLogEntry } from '@js-modules/apps-travel-log-common-store-redux';
import {
  nodeLogEntryUnsavedEmpty,
  useNodeLogEntriesEntity,
  useNodeLogEntriesGetOne,
  useNodeLogEntriesUpdatePartialReducerMetadata,
  useNodeLogEntriesValidateNodeLogEntryUnsaved,
} from '@js-modules/apps-travel-log-common-store-redux';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { useWebParams } from '@js-modules/web-react-router';
import type { LogLogEntryAddEditContextValue } from './LogLogEntryAddEditContext';
import { LogLogEntryAddEditContext } from './LogLogEntryAddEditContext';
import { LogLogEntryAddEditWorkspaceContentBox } from './LogLogEntryAddEditWorkspaceContentBox';
import { LogLogEntryAddEditWorkspaceTopToolbar } from './LogLogEntryAddEditWorkspaceTopToolbar';

export function LogLogEntryAddEditWorkspace(): React.ReactNode {
  const { logEntryId } = useWebParams();

  const nodeLogEntry = useNodeLogEntriesEntity(logEntryId ?? '');

  const nodeLogEntryUnsavedFormValidator =
    useNodeLogEntriesValidateNodeLogEntryUnsaved();

  const {
    request: nodeLogEntriesGetOneRequest,
    callback: nodeLogEntriesGetOneCallback,
  } = useNodeLogEntriesGetOne();

  const {
    reducerMetadata: { nodeLogEntryUnsaved },
    callback: nodeLogEntriesUpdatePartialReducerMetadataCallback,
  } = useNodeLogEntriesUpdatePartialReducerMetadata();

  const logLogEntryAddEditContextValue: LogLogEntryAddEditContextValue = {
    nodeLogEntryUnsavedFormValidator,
  };

  const routeMetadataBase = logEntryId
    ? routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
        WebSubModulesLog.logEntry
      ].subRoutes![WebSubModulesLogLogEntry.edit]
    : routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
        WebSubModulesLog.logEntry
      ].subRoutes![WebSubModulesLogLogEntry.addNew];
  const routeMetadata = {
    ...routeMetadataBase,
    label: `${routeMetadataBase.label} log entry`,
  };

  useEffect(() => {
    let nodeLogEntryUnsavedInitial: NodeLogEntry;

    if (logEntryId) {
      if (!nodeLogEntry) {
        if (!nodeLogEntriesGetOneRequest) {
          nodeLogEntriesGetOneCallback(logEntryId);
        }
        return;
      }

      nodeLogEntryUnsavedInitial = { ...nodeLogEntry };
    } else {
      nodeLogEntryUnsavedInitial = nodeLogEntryUnsavedEmpty;
    }

    nodeLogEntriesUpdatePartialReducerMetadataCallback({
      nodeLogEntryUnsaved: nodeLogEntryUnsavedInitial,
    });
  }, [
    logEntryId,
    nodeLogEntriesGetOneCallback,
    nodeLogEntriesGetOneRequest,
    nodeLogEntriesUpdatePartialReducerMetadataCallback,
    nodeLogEntry,
  ]);

  const isLogEntryLoading =
    !isUndefined(logEntryId) &&
    (isUndefined(nodeLogEntry) || isNull(nodeLogEntryUnsaved));

  return (
    <LogLogEntryAddEditContext.Provider value={logLogEntryAddEditContextValue}>
      <Workspace
        slots={{
          [WorkspaceSlotName.title]: (
            <WorkspaceTitle routeMetadata={routeMetadata} />
          ),
          [WorkspaceSlotName.workspaceTopToolbar]: (
            <LogLogEntryAddEditWorkspaceTopToolbar />
          ),
        }}
      >
        {isLogEntryLoading ? (
          <CircularProgress size={40} />
        ) : (
          <LogLogEntryAddEditWorkspaceContentBox />
        )}
      </Workspace>
    </LogLogEntryAddEditContext.Provider>
  );
}
