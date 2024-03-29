import React from 'react';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-components';
import { Modules } from '@js-modules/apps-dapp-common-constants';
import { WebPortfolioWorkspaceContentBox } from './WebPortfolioWorkspaceContentBox';
import { WebPortfolioWorkspaceTopToolbar } from './WebPortfolioWorkspaceTopToolbar';

export const WebPortfolioWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={Modules.portfolio}
      workspaceTopToolbar={<WebPortfolioWorkspaceTopToolbar />}
      workspaceContent={<WebPortfolioWorkspaceContentBox />}
    />
  );
};
