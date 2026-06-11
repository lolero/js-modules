import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { LogLogEntryAddEditWorkspace } from './LogLogEntryAddEditWorkspace';
import { LogLogEntryLogEntryIdRoutes } from './LogLogEntryLogEntryIdRoutes';

export const LogLogEntryRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route
        path={`${WebSubModulesLogLogEntry.addNew}`}
        element={<LogLogEntryAddEditWorkspace />}
      />
      <Route path=":logEntryId/*" element={<LogLogEntryLogEntryIdRoutes />} />
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
