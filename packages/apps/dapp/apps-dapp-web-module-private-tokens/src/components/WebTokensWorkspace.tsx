import type React from 'react';
import {
  WebModulesPrivate,
  WebSubModulesPortfolio,
} from '@js-modules/apps-dapp-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-dapp-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { WebTokensWorkspaceContentBox } from './WebTokensWorkspaceContentBox';
import { WebTokensWorkspaceTopToolbar } from './WebTokensWorkspaceTopToolbar';

export const WebTokensWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={
              routesMetadataPrivate[WebModulesPrivate.portfolio].subRoutes![
                WebSubModulesPortfolio.tokens
              ]
            }
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <WebTokensWorkspaceTopToolbar />
        ),
      }}
    >
      <WebTokensWorkspaceContentBox />
    </Workspace>
  );
};
