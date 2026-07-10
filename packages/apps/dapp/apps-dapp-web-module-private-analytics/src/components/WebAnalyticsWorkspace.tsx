import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { WebAnalyticsWorkspaceContentBox } from './WebAnalyticsWorkspaceContentBox';
import { WebAnalyticsWorkspaceTopToolbar } from './WebAnalyticsWorkspaceTopToolbar';

export function WebAnalyticsWorkspace(): React.ReactNode {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPrivate[WebModulesPrivate.analytics]}
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <WebAnalyticsWorkspaceTopToolbar />
        ),
      }}
    >
      <WebAnalyticsWorkspaceContentBox />
    </Workspace>
  );
}
