import React from 'react';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-components';
import { Modules } from '@js-modules/apps-dapp-common-constants';
import { WebAnalyticsWorkspaceContentBox } from './WebAnalyticsWorkspaceContentBox';
import { WebAnalyticsWorkspaceTopToolbar } from './WebAnalyticsWorkspaceTopToolbar';

export const WebAnalyticsWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={Modules.analytics}
      workspaceTopToolbar={<WebAnalyticsWorkspaceTopToolbar />}
      workspaceContent={<WebAnalyticsWorkspaceContentBox />}
    />
  );
};
