import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { WebSubModulesSettingsProfile } from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileEditWorkspaceContentBox } from './SettingsProfileEditWorkspaceContentBox';
import { SettingsProfileEditWorkspaceTopToolbar } from './SettingsProfileEditWorkspaceTopToolbar';

export const SettingsProfileEditWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={WebSubModulesSettingsProfile.edit}
      workspaceTopToolbar={<SettingsProfileEditWorkspaceTopToolbar />}
      workspaceContent={<SettingsProfileEditWorkspaceContentBox />}
    />
  );
};
