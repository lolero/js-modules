import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { MyModules } from '@js-modules/apps-travel-log-common-constants';
import { SettingsWorkspaceTopToolbar } from './SettingsWorkspaceTopToolbar';
import { SettingsWorkspaceContentBox } from './SettingsWorkspaceContentBox';

export const SettingsWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={MyModules.settings}
      workspaceTopToolbar={<SettingsWorkspaceTopToolbar />}
      workspaceContent={<SettingsWorkspaceContentBox />}
    />
  );
};
