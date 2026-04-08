import type React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesLog,
  WebSubModulesLogLogEntry,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { LogLogEntryAddEditWorkspaceBox } from './LogLogEntryAddEditWorkspaceBox';
import { LogLogEntryWorkspaceBox } from './LogLogEntryWorkspaceBox';

export const LogLogEntryLogEntryIdRoutes: React.FunctionComponent = () => {
  const { logEntryId } = useParams();

  return (
    <Routes>
      <Route index element={<LogLogEntryWorkspaceBox />} />
      <Route
        path={`${WebSubModulesLogLogEntry.edit}`}
        element={<LogLogEntryAddEditWorkspaceBox />}
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
