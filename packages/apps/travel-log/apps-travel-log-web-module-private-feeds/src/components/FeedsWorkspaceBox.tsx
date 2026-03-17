import React from 'react';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { FeedsWorkspaceTopToolbar } from './FeedsWorkspaceTopToolbar';
import { FeedsWorkspaceContentBox } from './FeedsWorkspaceContentBox';

export const FeedsWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={WebModulesPrivate.feeds}
      workspaceTopToolbar={<FeedsWorkspaceTopToolbar />}
      workspaceContent={<FeedsWorkspaceContentBox />}
    />
  );
};
