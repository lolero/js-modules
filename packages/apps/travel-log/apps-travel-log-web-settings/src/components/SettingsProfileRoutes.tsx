import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  MyModules,
  myModulesRoutesMetadata,
  SubModulesSettings,
  SubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileWorkspaceBox } from './SettingsProfileWorkspaceBox';
import { SettingsProfileEditWorkspaceBox } from './SettingsProfileEditWorkspaceBox';

export const SettingsProfileRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<SettingsProfileWorkspaceBox />} />
      <Route
        path={`${SubModulesSettingsProfile.edit}`}
        element={<SettingsProfileEditWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={
              myModulesRoutesMetadata[MyModules.settings].subRoutes![
                SubModulesSettings.profile
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
