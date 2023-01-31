import React from 'react';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-components';
import { SubModulesPortfolio } from '@js-modules/apps-dapp-common-constants';
import { WebTransactionsWorkspaceContentBox } from './WebTransactionsWorkspaceContentBox';
import { WebTransactionsWorkspaceTopToolbar } from './WebTransactionsWorkspaceTopToolbar';

export const WebTransactionsWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={SubModulesPortfolio.transactions}
      workspaceTopToolbar={<WebTransactionsWorkspaceTopToolbar />}
      workspaceContent={<WebTransactionsWorkspaceContentBox />}
    />
  );
};
