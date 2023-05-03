import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { SubModulesSettings } from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileWorkspaceContentBox } from './SettingsProfileWorkspaceContentBox';
import { SettingsProfileWorkspaceTopToolbar } from './SettingsProfileWorkspaceTopToolbar';

export const SettingsProfileWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={SubModulesSettings.profile}
      workspaceTopToolbar={<SettingsProfileWorkspaceTopToolbar />}
      workspaceContent={<SettingsProfileWorkspaceContentBox />}
    />
  );
};
