import { eventChannel, EventChannel } from 'redux-saga';
import Keycloak from 'keycloak-js';

export function stateAuthUtilCreateIsKeycloakTokenValidChannel(
  keycloak: Keycloak,
): EventChannel<boolean> {
  const isKeycloakTokenValidChannel = eventChannel<boolean>((emit) => {
    /* eslint-disable no-param-reassign */
    keycloak.onAuthSuccess = () => {
      emit(true);
    };
    keycloak.onAuthError = () => {
      emit(false);
    };
    keycloak.onAuthRefreshSuccess = () => {
      emit(true);
    };
    keycloak.onAuthRefreshError = () => {
      emit(false);
    };
    keycloak.onTokenExpired = () => {
      emit(false);
    };
    keycloak.onAuthLogout = () => {
      emit(false);
    };
    /* eslint-enable no-param-reassign */

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function unsubscribe(): void {}

    return unsubscribe;
  });

  return isKeycloakTokenValidChannel;
}
