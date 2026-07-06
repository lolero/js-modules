import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { SettingsProfileEditWorkspaceContentBox } from './SettingsProfileEditWorkspaceContentBox';
import { SettingsProfileEditWorkspaceTopToolbar } from './SettingsProfileEditWorkspaceTopToolbar';

export const SettingsProfileEditWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={
              routesMetadataPrivate[WebModulesPrivate.settings].subRoutes![
                WebSubModulesSettings.profile
              ].subRoutes![WebSubModulesSettingsProfile.edit]
            }
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <SettingsProfileEditWorkspaceTopToolbar />
        ),
      }}
    >
      <SettingsProfileEditWorkspaceContentBox />
    </Workspace>
  );
};
