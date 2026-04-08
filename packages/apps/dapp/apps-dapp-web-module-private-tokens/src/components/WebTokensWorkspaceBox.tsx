import type React from 'react';
import { WebSubModulesPortfolio } from '@js-modules/apps-dapp-common-constants';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-utils';
import { WebTokensWorkspaceContentBox } from './WebTokensWorkspaceContentBox';
import { WebTokensWorkspaceTopToolbar } from './WebTokensWorkspaceTopToolbar';

export const WebTokensWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={WebSubModulesPortfolio.tokens}
      workspaceTopToolbar={<WebTokensWorkspaceTopToolbar />}
      workspaceContent={<WebTokensWorkspaceContentBox />}
    />
  );
};
