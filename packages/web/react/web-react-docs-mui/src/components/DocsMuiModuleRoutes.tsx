import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import entries from 'lodash/entries';
import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import type { RoutesMetadata } from '@js-modules/common-react-nav';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import type {
  SubModuleOf,
  WebModuleWithSubRoutes,
} from '../routesMetadata/routesMetadata';
import { routesMetadataMui } from '../routesMetadata/routesMetadata';

export type DocsMuiModuleRoutesProps<
  WebModuleT extends WebModuleWithSubRoutes,
> = {
  webModule: WebModuleT;
  subModuleBoxes: Record<SubModuleOf<WebModuleT>, React.ReactNode>;
  moduleBox?: React.ReactNode;
};

export function DocsMuiModuleRoutes<WebModuleT extends WebModuleWithSubRoutes>({
  webModule,
  subModuleBoxes,
  moduleBox,
}: DocsMuiModuleRoutesProps<WebModuleT>): React.ReactNode {
  const modulePath = routesMetadataMui[webModule].path;
  const subRoutes: RoutesMetadata<IconDefinition> =
    routesMetadataMui[webModule].subRoutes;
  const subModuleBoxesEntries = entries<React.ReactNode>(subModuleBoxes);
  const [subModuleFirst] = subModuleBoxesEntries[0];

  return (
    <Routes>
      {moduleBox && (
        <Route
          index
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle
                    routeMetadata={routesMetadataMui[webModule]}
                  />
                ),
              }}
            >
              {moduleBox}
            </Workspace>
          }
        />
      )}
      {subModuleBoxesEntries.map(([subModule, subModuleBox]) => (
        <Route
          key={subModule}
          path={subModule}
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle routeMetadata={subRoutes[subModule]} />
                ),
              }}
            >
              {subModuleBox}
            </Workspace>
          }
        />
      ))}
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={moduleBox ? modulePath : subRoutes[subModuleFirst].path}
          />
        }
      />
    </Routes>
  );
}
