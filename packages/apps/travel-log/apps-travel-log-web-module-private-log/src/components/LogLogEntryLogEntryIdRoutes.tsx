import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { useWebParams } from '@js-modules/web-react-router';
import { LogLogEntryAddEditWorkspace } from './LogLogEntryAddEditWorkspace';
import { LogLogEntryWorkspace } from './LogLogEntryWorkspace';

export const LogLogEntryLogEntryIdRoutes: React.FunctionComponent = () => {
  const { logEntryId } = useWebParams();

  return (
    <Routes>
      <Route index element={<LogLogEntryWorkspace />} />
      <Route
        path={`${WebSubModulesLogLogEntry.edit}`}
        element={<LogLogEntryAddEditWorkspace />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={`${
              routesMetadataPrivate[WebModulesPrivate.log].subRoutes![
                WebSubModulesLog.logEntry
              ].path
            }/${logEntryId}`}
          />
        }
      />
    </Routes>
  );
};
