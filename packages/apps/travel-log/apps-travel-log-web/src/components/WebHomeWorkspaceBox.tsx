import React from 'react';
import { Modules } from '@js-modules/apps-travel-log-common-constants';
import { TravelLogWorkspaceBox } from '@js-modules/apps-travel-log-web-components';
import { WebHomeWorkspaceTopToolbar } from './WebHomeWorkspaceTopToolbar';
import { WebHomeWorkspaceContentBox } from './WebHomeWorkspaceContentBox';

export const WebHomeWorkspaceBox: React.FC = () => {
  return (
    <TravelLogWorkspaceBox
      title={Modules.home}
      workspaceTopToolbar={<WebHomeWorkspaceTopToolbar />}
      workspaceContent={<WebHomeWorkspaceContentBox />}
    />
  );
};
