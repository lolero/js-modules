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
import { WebTransactionsWorkspaceContentBox } from './WebTransactionsWorkspaceContentBox';
import { WebTransactionsWorkspaceTopToolbar } from './WebTransactionsWorkspaceTopToolbar';

export const WebTransactionsWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={
              routesMetadataPrivate[WebModulesPrivate.portfolio].subRoutes![
                WebSubModulesPortfolio.transactions
              ]
            }
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: (
          <WebTransactionsWorkspaceTopToolbar />
        ),
      }}
    >
      <WebTransactionsWorkspaceContentBox />
    </Workspace>
  );
};
