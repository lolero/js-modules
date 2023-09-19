import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  modulesPrivateRoutesMetadata,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { SettingsProfileWorkspaceBox } from './SettingsProfileWorkspaceBox';
import { SettingsProfileEditWorkspaceBox } from './SettingsProfileEditWorkspaceBox';

export const SettingsProfileRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<SettingsProfileWorkspaceBox />} />
      <Route
        path={`${WebSubModulesSettingsProfile.edit}`}
        element={<SettingsProfileEditWorkspaceBox />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to={
              modulesPrivateRoutesMetadata[WebModulesPrivate.settings]
                .subRoutes![WebSubModulesSettings.profile].path
            }
          />
        }
      />
    </Routes>
  );
};
