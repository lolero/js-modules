import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import {
  modulesPrivateRoutesMetadata,
  WebModulesPrivate,
  WebSubModulesMyLog,
} from '@js-modules/apps-travel-log-common-constants';
import { MyLogLogEntryWorkspaceContentBox } from './MyLogLogEntryWorkspaceContentBox';
import { MyLogLogEntryWorkspaceTopToolbar } from './MyLogLogEntryWorkspaceTopToolbar';

export const MyLogLogEntryWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={
        modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].subRoutes![
          WebSubModulesMyLog.logEntry
        ].label
      }
      workspaceTopToolbar={<MyLogLogEntryWorkspaceTopToolbar />}
      workspaceContent={<MyLogLogEntryWorkspaceContentBox />}
    />
  );
};
