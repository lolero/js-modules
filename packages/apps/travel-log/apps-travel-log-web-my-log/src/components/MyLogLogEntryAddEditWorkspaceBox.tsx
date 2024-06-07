import React, { useMemo } from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import {
  modulesPrivateRoutesMetadata,
  WebModulesPrivate,
  WebSubModulesMyLog,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { useParams } from 'react-router-dom';
import { MyLogLogEntryAddEditWorkspaceTopToolbar } from './MyLogLogEntryAddEditWorkspaceTopToolbar';
import { MyLogLogEntryAddEditWorkspaceContentBox } from './MyLogLogEntryAddEditWorkspaceContentBox';

export const MyLogLogEntryAddEditWorkspaceBox: React.FC = () => {
  const { logEntryId } = useParams();

  const title = useMemo(() => {
    const routeMetadataLabel = logEntryId
      ? modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].subRoutes![
          WebSubModulesMyLog.logEntry
        ].subRoutes![WebSubModulesMyLogLogEntry.edit].label
      : modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].subRoutes![
          WebSubModulesMyLog.logEntry
        ].subRoutes![WebSubModulesMyLogLogEntry.addNew].label;
    return `${routeMetadataLabel} log entry`;
  }, [logEntryId]);

  return (
    <MyWorkspaceBox
      title={title}
      workspaceTopToolbar={<MyLogLogEntryAddEditWorkspaceTopToolbar />}
      workspaceContent={<MyLogLogEntryAddEditWorkspaceContentBox />}
    />
  );
};
