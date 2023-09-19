import React from 'react';
import { MyWorkspaceBox } from '@js-modules/apps-travel-log-web-my-workspace';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { SettingsWorkspaceTopToolbar } from './SettingsWorkspaceTopToolbar';
import { SettingsWorkspaceContentBox } from './SettingsWorkspaceContentBox';

export const SettingsWorkspaceBox: React.FC = () => {
  return (
    <MyWorkspaceBox
      title={WebModulesPrivate.settings}
      workspaceTopToolbar={<SettingsWorkspaceTopToolbar />}
      workspaceContent={<SettingsWorkspaceContentBox />}
    />
  );
};
