import type React from 'react';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { HomeWorkspaceContentBox } from './HomeWorkspaceContentBox';
import { PublicWorkspaceBox } from './PublicWorkspaceBox';

export const HomeWorkspaceBox: React.FC = () => {
  return (
    <PublicWorkspaceBox
      title={WebModulesPublic.home}
      workspaceContent={<HomeWorkspaceContentBox />}
    />
  );
};
