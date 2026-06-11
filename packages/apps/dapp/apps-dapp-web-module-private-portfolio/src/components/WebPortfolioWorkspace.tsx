import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-nav';
import { WebPortfolioWorkspaceContentBox } from './WebPortfolioWorkspaceContentBox';
import { WebPortfolioWorkspaceTopToolbar } from './WebPortfolioWorkspaceTopToolbar';

export const WebPortfolioWorkspace: React.FC = () => {
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
};
