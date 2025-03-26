import React from 'react';
import { DappWorkspaceBox } from '@js-modules/apps-dapp-web-components';
import { WebModules } from '@js-modules/apps-dapp-common-constants';
import { WebAnalyticsWorkspaceContentBox } from './WebAnalyticsWorkspaceContentBox';
import { WebAnalyticsWorkspaceTopToolbar } from './WebAnalyticsWorkspaceTopToolbar';

export const WebAnalyticsWorkspaceBox: React.FC = () => {
  return (
    <DappWorkspaceBox
      title={WebModules.analytics}
      workspaceTopToolbar={<WebAnalyticsWorkspaceTopToolbar />}
      workspaceContent={<WebAnalyticsWorkspaceContentBox />}
    />
  );
};
