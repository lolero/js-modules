import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesSettings,
} from '@js-modules/apps-travel-log-common-constants';
import { SettingsWorkspaceBox } from './SettingsWorkspaceBox';
import { SettingsProfileRoutes } from './SettingsProfileRoutes';

export const SettingsRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<SettingsWorkspaceBox />} />
      <Route
        path={`${SubModulesSettings.profile}/*`}
        element={<SettingsProfileRoutes />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={myModulesRoutesMetadata[MyModules.settings].path}
          />
        }
      />
    </Routes>
  );
};
