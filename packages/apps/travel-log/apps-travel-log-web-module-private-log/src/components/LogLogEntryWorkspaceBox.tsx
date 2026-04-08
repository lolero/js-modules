import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { LogLogEntryWorkspaceContentBox } from './LogLogEntryWorkspaceContentBox';
import { LogLogEntryWorkspaceTopToolbar } from './LogLogEntryWorkspaceTopToolbar';

export const LogLogEntryWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={
        routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
          WebSubModulesLog.logEntry
        ].label
      }
      workspaceTopToolbar={<LogLogEntryWorkspaceTopToolbar />}
      workspaceContent={<LogLogEntryWorkspaceContentBox />}
    />
  );
};
