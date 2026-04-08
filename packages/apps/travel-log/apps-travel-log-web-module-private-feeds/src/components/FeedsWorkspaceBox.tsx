import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { FeedsWorkspaceContentBox } from './FeedsWorkspaceContentBox';
import { FeedsWorkspaceTopToolbar } from './FeedsWorkspaceTopToolbar';

export const FeedsWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={WebModulesPrivate.feeds}
      workspaceTopToolbar={<FeedsWorkspaceTopToolbar />}
      workspaceContent={<FeedsWorkspaceContentBox />}
    />
  );
};
