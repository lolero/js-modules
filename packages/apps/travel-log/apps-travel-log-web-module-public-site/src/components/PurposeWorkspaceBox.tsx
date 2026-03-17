import React from 'react';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { PublicWorkspaceBox } from './PublicWorkspaceBox';
import { PurposeWorkspaceContentBox } from './PurposeWorkspaceContentBox';

export const PurposeWorkspaceBox: React.FC = () => {
  return (
    <PublicWorkspaceBox
      title={WebModulesPublic.purpose}
      workspaceContent={<PurposeWorkspaceContentBox />}
    />
  );
};
