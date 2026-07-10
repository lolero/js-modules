import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { SettingsWorkspaceContentBox } from './SettingsWorkspaceContentBox';
import { SettingsWorkspaceTopToolbar } from './SettingsWorkspaceTopToolbar';

export function SettingsWorkspace(): React.ReactNode {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPrivate[WebModulesPrivate.settings]}
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <SettingsWorkspaceTopToolbar />
        ),
      }}
    >
      <SettingsWorkspaceContentBox />
    </Workspace>
  );
}
