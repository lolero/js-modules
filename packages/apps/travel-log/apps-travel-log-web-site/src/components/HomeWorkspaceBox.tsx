import React from 'react';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { PublicWorkspaceBox } from './PublicWorkspaceBox';
import { HomeWorkspaceContentBox } from './HomeWorkspaceContentBox';

export const HomeWorkspaceBox: React.FC = () => {
  return (
    <PublicWorkspaceBox
      title={WebModulesPublic.home}
      workspaceContent={<HomeWorkspaceContentBox />}
    />
  );
};
