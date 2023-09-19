import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsWorkspaceTopToolbar } from './MyFeedsWorkspaceTopToolbar';
import { MyFeedsWorkspaceContentBox } from './MyFeedsWorkspaceContentBox';

export const MyFeedsWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={WebModulesPrivate.myFeeds}
      workspaceTopToolbar={<MyFeedsWorkspaceTopToolbar />}
      workspaceContent={<MyFeedsWorkspaceContentBox />}
    />
  );
};
