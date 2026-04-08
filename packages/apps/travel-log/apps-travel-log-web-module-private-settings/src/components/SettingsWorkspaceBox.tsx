import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { PrivateWorkspaceBox } from '@js-modules/apps-travel-log-web-workspace-private';
import { SettingsWorkspaceContentBox } from './SettingsWorkspaceContentBox';
import { SettingsWorkspaceTopToolbar } from './SettingsWorkspaceTopToolbar';

export const SettingsWorkspaceBox: React.FC = () => {
  return (
    <PrivateWorkspaceBox
      title={WebModulesPrivate.settings}
      workspaceTopToolbar={<SettingsWorkspaceTopToolbar />}
      workspaceContent={<SettingsWorkspaceContentBox />}
    />
  );
};
