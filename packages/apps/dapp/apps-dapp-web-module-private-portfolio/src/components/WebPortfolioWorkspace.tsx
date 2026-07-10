import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { WebPortfolioWorkspaceContentBox } from './WebPortfolioWorkspaceContentBox';
import { WebPortfolioWorkspaceTopToolbar } from './WebPortfolioWorkspaceTopToolbar';

export function WebPortfolioWorkspace(): React.ReactNode {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPrivate[WebModulesPrivate.portfolio]}
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <WebPortfolioWorkspaceTopToolbar />
        ),
      }}
    >
      <WebPortfolioWorkspaceContentBox />
    </Workspace>
  );
}
