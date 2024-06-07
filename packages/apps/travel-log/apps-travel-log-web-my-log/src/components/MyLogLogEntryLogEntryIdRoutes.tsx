import React from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import {
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
  WebSubModulesMyLogLogEntry,
  WebSubModulesMyLog,
} from '@js-modules/apps-travel-log-common-constants';
import { MyLogLogEntryAddEditWorkspaceBox } from './MyLogLogEntryAddEditWorkspaceBox';
import { MyLogLogEntryWorkspaceBox } from './MyLogLogEntryWorkspaceBox';

export const MyLogLogEntryLogEntryIdRoutes: React.FunctionComponent = () => {
  const { logEntryId } = useParams();

  return (
    <Routes>
      <Route index element={<MyLogLogEntryWorkspaceBox />} />
      <Route
        path={`${WebSubModulesMyLogLogEntry.edit}`}
        element={<MyLogLogEntryAddEditWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={`${
              modulesPrivateRoutesMetadata[WebModulesPrivate.myLog].subRoutes![
                WebSubModulesMyLog.logEntry
              ].path
            }/${logEntryId}`}
          />
        }
      />
    </Routes>
  );
};
