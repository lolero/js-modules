import { useMemo, useEffect } from 'react';
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import {
  useStateAuthInitializeKeycloak,
  useStateSettingsGetProfile,
  useStateSettingsSignout,
} from '@js-modules/apps-travel-log-common-store-redux';
import {
  AUTH__URI__TRAVEL_LOG,
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import {
  routesMetadataPrivate,
  routesMetadataPublic,
} from '../routesMetadata/routesMetadata.exports';

const keycloakConfig: KeycloakConfig = {
  url: AUTH__URI__TRAVEL_LOG,
  realm: 'travel-log',
  clientId: 'client-web',
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'check-sso',
  // silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  checkLoginIframe: false,
};

export function useInitializeKeycloak(): {
  isKeycloakReady: boolean;
  rootPath: string;
} {
  const { callback: stateSettingsGetProfileCallback } =
    useStateSettingsGetProfile();

  const { callback: stateSettingsSignoutCallback } = useStateSettingsSignout();

  const {
    reducerMetadata: { isKeycloakReady, isAuthenticated },
    callback: stateAuthInitializeKeycloakCallback,
  } = useStateAuthInitializeKeycloak(
    keycloakConfig,
    keycloakInitOptions,
    stateSettingsGetProfileCallback,
    stateSettingsSignoutCallback,
  );

  const rootPath = useMemo(() => {
    return !isAuthenticated
      ? routesMetadataPublic[WebModulesPublic.home].path
      : routesMetadataPrivate[WebModulesPrivate.myFeeds].path;
  }, [isAuthenticated]);

  useEffect(() => {
    stateAuthInitializeKeycloakCallback();
  }, [stateAuthInitializeKeycloakCallback]);

  return { isKeycloakReady, rootPath };
}
