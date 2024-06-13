import React, { useEffect, useMemo } from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import {
  WebModulesPrivate,
  WebSubModulesMyLog,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { useParams } from 'react-router-dom';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import {
  NodeLogEntry,
  nodeLogEntryUnsavedEmpty,
  useNodeLogEntriesEntity,
  useNodeLogEntriesGetOne,
  useNodeLogEntriesUpdatePartialReducerMetadata,
  useNodeLogEntriesValidateNodeLogEntryUnsaved,
} from '@js-modules/apps-travel-log-common-store-redux';
import isUndefined from 'lodash/isUndefined';
import CircularProgress from '@mui/material/CircularProgress';
import isNull from 'lodash/isNull';
import { MyLogLogEntryAddEditWorkspaceTopToolbar } from './MyLogLogEntryAddEditWorkspaceTopToolbar';
import { MyLogLogEntryAddEditWorkspaceContentBox } from './MyLogLogEntryAddEditWorkspaceContentBox';
import {
  MyLogLogEntryAddEditContext,
  MyLogLogEntryAddEditContextValue,
} from './MyLogLogEntryAddEditContext';

export const MyLogLogEntryAddEditWorkspaceBox: React.FC = () => {
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

  const myLogLogEntryAddEditContextValue: MyLogLogEntryAddEditContextValue =
    useMemo(() => {
      return {
        nodeLogEntryUnsavedFormValidator,
      };
    }, [nodeLogEntryUnsavedFormValidator]);

  const title = useMemo(() => {
    const routeMetadataLabel = logEntryId
      ? routesMetadataPrivate[WebModulesPrivate.myLog].subRoutes![
          WebSubModulesMyLog.logEntry
        ].subRoutes![WebSubModulesMyLogLogEntry.edit].label
      : routesMetadataPrivate[WebModulesPrivate.myLog].subRoutes![
          WebSubModulesMyLog.logEntry
        ].subRoutes![WebSubModulesMyLogLogEntry.addNew].label;
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

    return <MyLogLogEntryAddEditWorkspaceContentBox />;
  }, [logEntryId, nodeLogEntry, nodeLogEntryUnsaved]);

  return (
    <MyLogLogEntryAddEditContext.Provider
      value={myLogLogEntryAddEditContextValue}
    >
      <MyWorkspaceBox
        title={title}
        workspaceTopToolbar={<MyLogLogEntryAddEditWorkspaceTopToolbar />}
        workspaceContent={workspaceContent}
      />
    </MyLogLogEntryAddEditContext.Provider>
  );
};
