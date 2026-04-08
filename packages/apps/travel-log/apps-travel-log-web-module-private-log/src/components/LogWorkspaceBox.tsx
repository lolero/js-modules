import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { LogWorkspaceContentBox } from './LogWorkspaceContentBox';
import { LogWorkspaceTopToolbar } from './LogWorkspaceTopToolbar';

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
