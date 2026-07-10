import type React from 'react';
import { WebModulesPublic } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPublic } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { PurposeWorkspaceContentBox } from './PurposeWorkspaceContentBox';

export function PurposeWorkspace(): React.ReactNode {
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
}
