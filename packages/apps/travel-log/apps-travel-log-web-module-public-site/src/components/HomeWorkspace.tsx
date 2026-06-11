import type React from 'react';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-nav';
import { HomeWorkspaceContentBox } from './HomeWorkspaceContentBox';

export const HomeWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPublic[WebModulesPublic.home]}
          />
        ),
      }}
    >
      <HomeWorkspaceContentBox />
    </Workspace>
  );
};
