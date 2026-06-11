import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesAnalytics,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-nav';
import { WebAnalyticsWorkspaceContentBox } from './WebAnalyticsWorkspaceContentBox';
import { WebAnalyticsWorkspaceTopToolbar } from './WebAnalyticsWorkspaceTopToolbar';

export const WebAnalyticsTokensWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={
              routesMetadataPrivate[WebModulesPrivate.analytics].subRoutes![
                WebSubModulesAnalytics.tokens
              ]
            }
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
};
