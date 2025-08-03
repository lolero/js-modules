import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { MyLogWorkspaceTopToolbar } from './MyLogWorkspaceTopToolbar';
import { MyLogWorkspaceContentBox } from './MyLogWorkspaceContentBox';

export const MyLogWorkspaceBox: React.FC = () => {
  // TODO: write filter and sorting logic where the state is maintained in
  //  the url query params.
  return (
    <MyWorkspaceBox
      title={WebModulesPrivate.myLog}
      workspaceTopToolbar={<MyLogWorkspaceTopToolbar />}
      workspaceContent={<MyLogWorkspaceContentBox />}
    />
  );
};
