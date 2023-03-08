import { KeycloakConfig } from 'keycloak-js';

export const keycloakConfig: KeycloakConfig = {
  url: 'localhost:8080',
  realm: 'travel-log',
  clientId: 'travel-log-web',
};
