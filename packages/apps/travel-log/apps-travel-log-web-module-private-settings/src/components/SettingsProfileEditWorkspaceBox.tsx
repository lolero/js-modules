import React from 'react';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { WebSubModulesSettingsProfile } from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileEditWorkspaceContentBox } from './SettingsProfileEditWorkspaceContentBox';
import { SettingsProfileEditWorkspaceTopToolbar } from './SettingsProfileEditWorkspaceTopToolbar';

export const SettingsProfileEditWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={WebSubModulesSettingsProfile.edit}
      workspaceTopToolbar={<SettingsProfileEditWorkspaceTopToolbar />}
      workspaceContent={<SettingsProfileEditWorkspaceContentBox />}
    />
  );
};
