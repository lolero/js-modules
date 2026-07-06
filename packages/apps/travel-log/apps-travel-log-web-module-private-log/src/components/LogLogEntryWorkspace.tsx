import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { LogLogEntryWorkspaceContentBox } from './LogLogEntryWorkspaceContentBox';
import { LogLogEntryWorkspaceTopToolbar } from './LogLogEntryWorkspaceTopToolbar';

export const LogLogEntryWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={
              routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
                WebSubModulesLog.logEntry
              ]
            }
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <LogLogEntryWorkspaceTopToolbar />
        ),
      }}
    >
      <LogLogEntryWorkspaceContentBox />
    </Workspace>
  );
};
