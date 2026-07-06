import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { SettingsProfileWorkspaceContentBox } from './SettingsProfileWorkspaceContentBox';
import { SettingsProfileWorkspaceTopToolbar } from './SettingsProfileWorkspaceTopToolbar';

export const SettingsProfileWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={
              routesMetadataPrivate[WebModulesPrivate.settings].subRoutes![
                WebSubModulesSettings.profile
              ]
            }
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <SettingsProfileWorkspaceTopToolbar />
        ),
      }}
    >
      <SettingsProfileWorkspaceContentBox />
    </Workspace>
  );
};
