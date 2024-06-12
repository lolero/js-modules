import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
import { MyLogLogEntryAddEditWorkspaceBox } from './MyLogLogEntryAddEditWorkspaceBox';
import { MyLogLogEntryLogEntryIdRoutes } from './MyLogLogEntryLogEntryIdRoutes';

export const MyLogLogEntryRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route
        path={`${WebSubModulesMyLogLogEntry.addNew}`}
        element={<MyLogLogEntryAddEditWorkspaceBox />}
      />
      <Route path=":logEntryId/*" element={<MyLogLogEntryLogEntryIdRoutes />} />
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
