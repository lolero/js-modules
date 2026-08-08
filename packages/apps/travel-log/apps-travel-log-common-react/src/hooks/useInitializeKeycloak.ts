import type { KeycloakInitOptions, KeycloakServerConfig } from 'keycloak-js';
import { useEffect } from 'react';
import {
  AUTH__URI__TRAVEL_LOG,
  WebModulesPrivate,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import {
  ClientType,
  useStateAuthInitializeKeycloak,
  useStateSettingsGetProfile,
  useStateSettingsSignout,
} from '@js-modules/apps-travel-log-common-store-redux';
import {
  routesMetadataPrivate,
  routesMetadataPublic,
} from '../routesMetadata/routesMetadata.exports';

const keycloakServerConfig: Omit<KeycloakServerConfig, 'clientId'> = {
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
      ...keycloakServerConfig,
      clientId: `client-${clientType}`,
    },
    clientType === ClientType.web ? keycloakInitOptions : {},
    stateSettingsGetProfileCallback,
    stateSettingsSignoutCallback,
  );

  let rootPath: string = routesMetadataPublic[WebModulesPublic.home].path;
  if (clientType === ClientType.native) {
    rootPath = isAuthenticated
      ? WebModulesPrivate.feeds
      : WebModulesPublic.home;
  } else if (isAuthenticated) {
    rootPath = routesMetadataPrivate[WebModulesPrivate.feeds].path;
  }

  useEffect(() => {
    stateAuthInitializeKeycloakCallback();
  }, [stateAuthInitializeKeycloakCallback]);

  return { isKeycloakReady, rootPath };
}
