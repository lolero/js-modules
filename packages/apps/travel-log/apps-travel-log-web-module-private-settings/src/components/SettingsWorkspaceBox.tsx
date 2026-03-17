import React from 'react';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { SettingsWorkspaceTopToolbar } from './SettingsWorkspaceTopToolbar';
import { SettingsWorkspaceContentBox } from './SettingsWorkspaceContentBox';

export const SettingsWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={WebModulesPrivate.settings}
      workspaceTopToolbar={<SettingsWorkspaceTopToolbar />}
      workspaceContent={<SettingsWorkspaceContentBox />}
    />
  );
};
