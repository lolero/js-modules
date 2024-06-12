import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-web-components';
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
              routesMetadataPrivate[WebModulesPrivate.settings].subRoutes![
                WebSubModulesSettings.profile
              ].path
            }
          />
        }
      />
    </Routes>
  );
};
