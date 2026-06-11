import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-nav';
import { SettingsWorkspaceContentBox } from './SettingsWorkspaceContentBox';
import { SettingsWorkspaceTopToolbar } from './SettingsWorkspaceTopToolbar';

export const SettingsWorkspace: React.FC = () => {
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
};
