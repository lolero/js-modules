import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-dapp-common-constants';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-utils';
import { WebPortfolioWorkspaceContentBox } from './WebPortfolioWorkspaceContentBox';
import { WebPortfolioWorkspaceTopToolbar } from './WebPortfolioWorkspaceTopToolbar';

export const WebPortfolioWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={WebModulesPrivate.portfolio}
      workspaceTopToolbar={<WebPortfolioWorkspaceTopToolbar />}
      workspaceContent={<WebPortfolioWorkspaceContentBox />}
    />
  );
};
