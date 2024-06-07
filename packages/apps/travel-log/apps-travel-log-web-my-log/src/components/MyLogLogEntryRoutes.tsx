import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
  WebSubModulesMyLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
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
            to={modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].path}
          />
        }
      />
    </Routes>
  );
};
