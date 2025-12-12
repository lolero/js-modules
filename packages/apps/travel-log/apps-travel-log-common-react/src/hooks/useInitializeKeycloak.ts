import { useEffect, useMemo } from 'react';
import { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';
import {
  ClientType,
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

const keycloakConfig: Omit<KeycloakConfig, 'clientId'> = {
  url: AUTH__URI__TRAVEL_LOG,
  realm: 'travel-log',
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'check-sso',
  // silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  checkLoginIframe: false,
};

export function useInitializeKeycloak(clientType: ClientType): {
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
    {
      ...keycloakConfig,
      clientId: `client-${clientType}`,
    },
    clientType === ClientType.web ? keycloakInitOptions : {},
    stateSettingsGetProfileCallback,
    stateSettingsSignoutCallback,
  );

  const rootPath = useMemo(() => {
    if (clientType === ClientType.native) {
      return !isAuthenticated
        ? WebModulesPublic.home
        : WebModulesPrivate.myFeeds;
    }

    return !isAuthenticated
      ? routesMetadataPublic[WebModulesPublic.home].path
      : routesMetadataPrivate[WebModulesPrivate.myFeeds].path;
  }, [clientType, isAuthenticated]);

  useEffect(() => {
    stateAuthInitializeKeycloakCallback();
  }, [stateAuthInitializeKeycloakCallback]);

  return { isKeycloakReady, rootPath };
}
