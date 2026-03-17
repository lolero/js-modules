import React from 'react';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { WebSubModulesSettings } from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileWorkspaceContentBox } from './SettingsProfileWorkspaceContentBox';
import { SettingsProfileWorkspaceTopToolbar } from './SettingsProfileWorkspaceTopToolbar';

export const SettingsProfileWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={WebSubModulesSettings.profile}
      workspaceTopToolbar={<SettingsProfileWorkspaceTopToolbar />}
      workspaceContent={<SettingsProfileWorkspaceContentBox />}
    />
  );
};
