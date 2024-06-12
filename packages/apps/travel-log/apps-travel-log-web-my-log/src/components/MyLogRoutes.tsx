import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesMyLog,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import { MyLogWorkspaceBox } from './MyLogWorkspaceBox';
import { MyLogLogEntryRoutes } from './MyLogLogEntryRoutes';

export const MyLogRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<MyLogWorkspaceBox />} />
      <Route
        path={`${WebSubModulesMyLog.logEntry}/*`}
        element={<MyLogLogEntryRoutes />}
      />
      <Route
        path={`${WebSubModulesMyLog.trips}`}
        element={<MyLogWorkspaceBox />}
      />
      <Route
        path={`${WebSubModulesMyLog.dives}`}
        element={<MyLogWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={routesMetadataPrivate[WebModulesPrivate.myLog].path}
          />
        }
      />
    </Routes>
  );
};
