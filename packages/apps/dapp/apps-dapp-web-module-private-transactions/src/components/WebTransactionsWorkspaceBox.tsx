import type React from 'react';
import { WebSubModulesPortfolio } from '@js-modules/apps-dapp-common-constants';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-utils';
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
