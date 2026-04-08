import type React from 'react';
import { WebSubModulesAnalytics } from '@js-modules/apps-dapp-common-constants';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-utils';
import { WebAnalyticsWorkspaceContentBox } from './WebAnalyticsWorkspaceContentBox';
import { WebAnalyticsWorkspaceTopToolbar } from './WebAnalyticsWorkspaceTopToolbar';

export const WebAnalyticsTokensWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={WebSubModulesAnalytics.tokens}
      workspaceTopToolbar={<WebAnalyticsWorkspaceTopToolbar />}
      workspaceContent={<WebAnalyticsWorkspaceContentBox />}
    />
  );
};
