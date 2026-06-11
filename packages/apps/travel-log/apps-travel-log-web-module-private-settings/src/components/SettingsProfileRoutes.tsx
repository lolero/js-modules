import type React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {
  WebModulesPrivate,
  WebSubModulesSettings,
  WebSubModulesSettingsProfile,
} from '@js-modules/apps-travel-log-common-constants';
import { routesMetadataPrivate } from '@js-modules/apps-travel-log-common-react';
import { SettingsProfileEditWorkspace } from './SettingsProfileEditWorkspace';
import { SettingsProfileWorkspace } from './SettingsProfileWorkspace';

export const SettingsProfileRoutes: React.FunctionComponent = () => {
  return (
    <Routes>
      <Route index element={<SettingsProfileWorkspace />} />
      <Route
        path={`${WebSubModulesSettingsProfile.edit}`}
        element={<SettingsProfileEditWorkspace />}
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
