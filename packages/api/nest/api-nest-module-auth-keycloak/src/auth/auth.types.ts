import { KeycloakTokenParsed } from 'keycloak-js';

export interface AuthUsersService {
  checkIn: (keycloakTokenParsed: KeycloakTokenParsed) => Promise<any | null>;
}
