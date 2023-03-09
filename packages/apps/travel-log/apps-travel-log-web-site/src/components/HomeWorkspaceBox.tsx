import React from 'react';
import { PublicModules } from '@js-modules/apps-travel-log-common-constants';
import { PublicWorkspaceBox } from './PublicWorkspaceBox';
import { HomeWorkspaceContentBox } from './HomeWorkspaceContentBox';

export const HomeWorkspaceBox: React.FC = () => {
  return (
    <PublicWorkspaceBox
      title={PublicModules.home}
      workspaceContent={<HomeWorkspaceContentBox />}
    />
  );
};
