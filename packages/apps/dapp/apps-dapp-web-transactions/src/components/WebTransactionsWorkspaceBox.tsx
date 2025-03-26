import React from 'react';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-components';
import { WebSubModulesPortfolio } from '@js-modules/apps-dapp-common-constants';
import { WebTransactionsWorkspaceContentBox } from './WebTransactionsWorkspaceContentBox';
import { WebTransactionsWorkspaceTopToolbar } from './WebTransactionsWorkspaceTopToolbar';

export const WebTransactionsWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={WebSubModulesPortfolio.transactions}
      workspaceTopToolbar={<WebTransactionsWorkspaceTopToolbar />}
      workspaceContent={<WebTransactionsWorkspaceContentBox />}
    />
  );
};
