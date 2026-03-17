import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { LogWorkspaceBox } from './LogWorkspaceBox';
import { LogLogEntryRoutes } from './LogLogEntryRoutes';

export const LogRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<LogWorkspaceBox />} />
      <Route
        path={`${WebSubModulesLog.logEntry}/*`}
        element={<LogLogEntryRoutes />}
      />
      <Route path={`${WebSubModulesLog.trips}`} element={<LogWorkspaceBox />} />
      <Route path={`${WebSubModulesLog.dives}`} element={<LogWorkspaceBox />} />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataPrivate[WebModulesPrivate.log].path}
          />
        }
      />
    </Routes>
  );
};
