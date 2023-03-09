import React from 'react';
import { PublicModules } from '@js-modules/apps-travel-log-common-constants';
import { PublicWorkspaceBox } from './PublicWorkspaceBox';
import { PurposeWorkspaceContentBox } from './PurposeWorkspaceContentBox';

export const PurposeWorkspaceBox: React.FC = () => {
  return (
    <PublicWorkspaceBox
      title={PublicModules.purpose}
      workspaceContent={<PurposeWorkspaceContentBox />}
    />
  );
};
