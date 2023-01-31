import React from 'react';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-components';
import { SubModulesPortfolio } from '@js-modules/apps-dapp-common-constants';
import { WebTokensWorkspaceContentBox } from './WebTokensWorkspaceContentBox';
import { WebTokensWorkspaceTopToolbar } from './WebTokensWorkspaceTopToolbar';

export const WebTokensWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={SubModulesPortfolio.tokens}
      workspaceTopToolbar={<WebTokensWorkspaceTopToolbar />}
      workspaceContent={<WebTokensWorkspaceContentBox />}
    />
  );
};
