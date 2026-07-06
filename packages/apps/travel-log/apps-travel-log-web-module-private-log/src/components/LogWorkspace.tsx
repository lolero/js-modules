import type React from 'react';
import { WebModulesPrivate } from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { LogWorkspaceContentBox } from './LogWorkspaceContentBox';
import { LogWorkspaceTopToolbar } from './LogWorkspaceTopToolbar';

export const LogWorkspace: React.FC = () => {
  // TODO: write filter and sorting logic where the state is maintained in
  //  the url query params.
  return (
    <Workspace
      slots={{
        [WorkspaceSlotName.title]: (
          <WorkspaceTitle
            routeMetadata={routesMetadataPrivate[WebModulesPrivate.log]}
          />
        ),
        [WorkspaceSlotName.workspaceTopToolbar]: <LogWorkspaceTopToolbar />,
      }}
    >
      <LogWorkspaceContentBox />
    </Workspace>
  );
};
