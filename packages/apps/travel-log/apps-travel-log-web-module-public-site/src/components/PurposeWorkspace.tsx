import type React from 'react';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-nav';
import { PurposeWorkspaceContentBox } from './PurposeWorkspaceContentBox';

export const PurposeWorkspace: React.FC = () => {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPublic[WebModulesPublic.purpose]}
          />
        ),
      }}
    >
      <PurposeWorkspaceContentBox />
    </Workspace>
  );
};
