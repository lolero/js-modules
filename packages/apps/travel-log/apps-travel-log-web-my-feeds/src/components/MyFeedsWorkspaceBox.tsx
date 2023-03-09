import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { MyModules } from '@js-modules/apps-travel-log-common-constants';
import { MyFeedsWorkspaceTopToolbar } from './MyFeedsWorkspaceTopToolbar';
import { MyFeedsWorkspaceContentBox } from './MyFeedsWorkspaceContentBox';

export const MyFeedsWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={MyModules.myFeeds}
      workspaceTopToolbar={<MyFeedsWorkspaceTopToolbar />}
      workspaceContent={<MyFeedsWorkspaceContentBox />}
    />
  );
};
