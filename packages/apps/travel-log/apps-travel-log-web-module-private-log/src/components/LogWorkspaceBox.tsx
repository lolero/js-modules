import React from 'react';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { LogWorkspaceTopToolbar } from './LogWorkspaceTopToolbar';
import { LogWorkspaceContentBox } from './LogWorkspaceContentBox';

export const LogWorkspaceBox: React.FC = () => {
  // TODO: write filter and sorting logic where the state is maintained in
  //  the url query params.
  return (
    <PrivateWorkspaceBox
      title={WebModulesPrivate.log}
      workspaceTopToolbar={<LogWorkspaceTopToolbar />}
      workspaceContent={<LogWorkspaceContentBox />}
    />
  );
};
