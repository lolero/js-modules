import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  modulePaths,
  Modules,
} from '@js-modules/apps-travel-log-common-constants';
import { WebHomeWorkspaceBox } from './WebHomeWorkspaceBox';

export const WebHomeRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<WebHomeWorkspaceBox />} />
      <Route
        path="*"
        element={<Navigate replace to={modulePaths[Modules.home]} />}
      />
    </Routes>
  );
};
