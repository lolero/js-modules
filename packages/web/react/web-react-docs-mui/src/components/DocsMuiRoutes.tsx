import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Workspace,
  WorkspaceSlotName,
  WorkspaceTitle,
} from '@js-modules/web-react-mui-workspace';
import { WebModules } from '../constants/modules.constants';
import { routesMetadataMui } from '../routesMetadata/routesMetadata';
import { ChartRoutes } from './chart/ChartRoutes';
import { ChatBox } from './chat/ChatBox';
import { DataDisplayRoutes } from './dataDisplay/DataDisplayRoutes';
import { DataGridBox } from './dataGrid/DataGridBox';
import { DateTimeRoutes } from './dateTime/DateTimeRoutes';
import { DocsMuiWorkspaceLayout } from './DocsMuiWorkspaceLayout';
import { FeedbackRoutes } from './feedback/FeedbackRoutes';
import { InputsRoutes } from './inputs/InputsRoutes';
import { LayoutRoutes } from './layout/LayoutRoutes';
import { NavigationRoutes } from './navigation/NavigationRoutes';
import { PaletteBox } from './palette/PaletteBox';
import { SchedulerBox } from './scheduler/SchedulerBox';
import { SurfacesRoutes } from './surfaces/SurfacesRoutes';
import { TreeViewBox } from './treeView/TreeViewBox';

export function DocsMuiRoutes(): React.ReactNode {
  return (
    <Routes>
      <Route element={<DocsMuiWorkspaceLayout />}>
        <Route
          path={`${WebModules.palette}`}
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle
                    routeMetadata={routesMetadataMui[WebModules.palette]}
                  />
                ),
              }}
            >
              <PaletteBox />
            </Workspace>
          }
        />
        <Route path={`${WebModules.inputs}/*`} element={<InputsRoutes />} />
        <Route
          path={`${WebModules.dataDisplay}/*`}
          element={<DataDisplayRoutes />}
        />
        <Route path={`${WebModules.feedback}/*`} element={<FeedbackRoutes />} />
        <Route path={`${WebModules.surfaces}/*`} element={<SurfacesRoutes />} />
        <Route
          path={`${WebModules.navigation}/*`}
          element={<NavigationRoutes />}
        />
        <Route path={`${WebModules.layout}/*`} element={<LayoutRoutes />} />
        <Route path={`${WebModules.dateTime}/*`} element={<DateTimeRoutes />} />
        <Route
          path={`${WebModules.dataGrid}`}
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle
                    routeMetadata={routesMetadataMui[WebModules.dataGrid]}
                  />
                ),
              }}
            >
              <DataGridBox />
            </Workspace>
          }
        />
        <Route path={`${WebModules.chart}/*`} element={<ChartRoutes />} />
        <Route
          path={`${WebModules.chat}`}
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle
                    routeMetadata={routesMetadataMui[WebModules.chat]}
                  />
                ),
              }}
            >
              <ChatBox />
            </Workspace>
          }
        />
        <Route
          path={`${WebModules.treeView}`}
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle
                    routeMetadata={routesMetadataMui[WebModules.treeView]}
                  />
                ),
              }}
            >
              <TreeViewBox />
            </Workspace>
          }
        />
        <Route
          path={`${WebModules.scheduler}`}
          element={
            <Workspace
              slots={{
                [WorkspaceSlotName.title]: (
                  <WorkspaceTitle
                    routeMetadata={routesMetadataMui[WebModules.scheduler]}
                  />
                ),
              }}
            >
              <SchedulerBox />
            </Workspace>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Navigate replace to={routesMetadataMui[WebModules.palette].path} />
        }
      />
    </Routes>
  );
}
