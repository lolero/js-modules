import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import {
  WebModulesPrivate,
  WebSubModulesMyLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import { MyLogLogEntryWorkspaceContentBox } from './MyLogLogEntryWorkspaceContentBox';
import { MyLogLogEntryWorkspaceTopToolbar } from './MyLogLogEntryWorkspaceTopToolbar';

export const MyLogLogEntryWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={
        routesMetadataPrivate[WebModulesPrivate.myLog].subRoutes![
          WebSubModulesMyLog.logEntry
        ].label
      }
      workspaceTopToolbar={<MyLogLogEntryWorkspaceTopToolbar />}
      workspaceContent={<MyLogLogEntryWorkspaceContentBox />}
    />
  );
};
