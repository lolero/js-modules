import CircularProgress from '@mui/material/CircularProgress';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import type { LogLogEntryAddEditContextValue } from './LogLogEntryAddEditContext';
import { LogLogEntryAddEditContext } from './LogLogEntryAddEditContext';
import { LogLogEntryAddEditWorkspaceContentBox } from './LogLogEntryAddEditWorkspaceContentBox';
import { LogLogEntryAddEditWorkspaceTopToolbar } from './LogLogEntryAddEditWorkspaceTopToolbar';

export const LogLogEntryAddEditWorkspaceBox: React.FC = () => {
  const { logEntryId } = useParams();

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

  const logLogEntryAddEditContextValue: LogLogEntryAddEditContextValue =
    useMemo(() => {
      return {
        nodeLogEntryUnsavedFormValidator,
      };
    }, [nodeLogEntryUnsavedFormValidator]);

  const title = useMemo(() => {
    const routeMetadataLabel = logEntryId
      ? routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
          WebSubModulesLog.logEntry
        ].subRoutes![WebSubModulesLogLogEntry.edit].label
      : routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
          WebSubModulesLog.logEntry
        ].subRoutes![WebSubModulesLogLogEntry.addNew].label;
    return `${routeMetadataLabel} log entry`;
  }, [logEntryId]);

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

  const workspaceContent = useMemo(() => {
    if (
      !isUndefined(logEntryId) &&
      (isUndefined(nodeLogEntry) || isNull(nodeLogEntryUnsaved))
    ) {
      return <CircularProgress size={40} />;
    }

    return <LogLogEntryAddEditWorkspaceContentBox />;
  }, [logEntryId, nodeLogEntry, nodeLogEntryUnsaved]);

  return (
    <LogLogEntryAddEditContext.Provider value={logLogEntryAddEditContextValue}>
      <PrivateWorkspaceBox
        title={title}
        workspaceTopToolbar={<LogLogEntryAddEditWorkspaceTopToolbar />}
        workspaceContent={workspaceContent}
      />
    </LogLogEntryAddEditContext.Provider>
  );
};
