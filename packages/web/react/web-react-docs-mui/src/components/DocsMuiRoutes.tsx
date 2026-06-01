import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { WebModules } from '../constants/modules.constants';
import { routesMetadataMui } from '../routesMetadata/routesMetadata';
import { ChartRoutes } from './chart/ChartRoutes';
import { ChatBox } from './chat/ChatBox';
import { DataDisplayRoutes } from './dataDisplay/DataDisplayRoutes';
import { DataGridBox } from './dataGrid/DataGridBox';
import { DateTimeRoutes } from './dateTime/DateTimeRoutes';
import { DocsMuiWorkspaceBox } from './DocsMuiWorkspaceBox';
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
      <Route
        path={`${WebModules.palette}`}
        element={
          <DocsMuiWorkspaceBox
            title={routesMetadataMui[WebModules.palette].label}
            workspaceContent={<PaletteBox />}
          />
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
          <DocsMuiWorkspaceBox
            title={routesMetadataMui[WebModules.dataGrid].label}
            workspaceContent={<DataGridBox />}
          />
        }
      />
      <Route path={`${WebModules.chart}/*`} element={<ChartRoutes />} />
      <Route
        path={`${WebModules.chat}`}
        element={
          <DocsMuiWorkspaceBox
            title={routesMetadataMui[WebModules.chat].label}
            workspaceContent={<ChatBox />}
          />
        }
      />
      <Route
        path={`${WebModules.treeView}`}
        element={
          <DocsMuiWorkspaceBox
            title={routesMetadataMui[WebModules.treeView].label}
            workspaceContent={<TreeViewBox />}
          />
        }
      />
      <Route
        path={`${WebModules.scheduler}`}
        element={
          <DocsMuiWorkspaceBox
            title={routesMetadataMui[WebModules.scheduler].label}
            workspaceContent={<SchedulerBox />}
          />
        }
      />
      <Route
        path="*"
        element={
          <Navigate replace to={routesMetadataMui[WebModules.palette].path} />
        }
      />
    </Routes>
  );
}
