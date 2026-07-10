import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { FeedsWorkspaceContentBox } from './FeedsWorkspaceContentBox';
import { FeedsWorkspaceTopToolbar } from './FeedsWorkspaceTopToolbar';

export function FeedsWorkspace(): React.ReactNode {
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPrivate[WebModulesPrivate.feeds]}
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: <FeedsWorkspaceTopToolbar />,
      }}
    >
      <FeedsWorkspaceContentBox />
    </Workspace>
  );
}
