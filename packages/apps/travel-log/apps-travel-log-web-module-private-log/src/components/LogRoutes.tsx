import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { LogLogEntryRoutes } from './LogLogEntryRoutes';
import { LogWorkspace } from './LogWorkspace';

export function LogRoutes(): React.ReactNode {
  return (
    <Routes>
      <Route index element={<LogWorkspace />} />
      <Route
        path={`${WebSubModulesLog.logEntry}/*`}
        element={<LogLogEntryRoutes />}
      />
      <Route path={`${WebSubModulesLog.trips}`} element={<LogWorkspace />} />
      <Route path={`${WebSubModulesLog.dives}`} element={<LogWorkspace />} />
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
}
