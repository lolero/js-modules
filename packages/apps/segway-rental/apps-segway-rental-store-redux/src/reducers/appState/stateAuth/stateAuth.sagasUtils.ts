import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { eventChannel, EventChannel } from 'redux-saga';
import { noop } from 'lodash';

export function createAuthOnChangeChannel(): EventChannel<{
  authUser: User | null;
  authError: Error | null;
}> {
  const authOnChangeChannel = eventChannel(
    (
      emit: (input: { authUser: User | null; authError: Error | null }) => void,
    ) => {
      onAuthStateChanged(
        getAuth(),
        (authUser) => {
          emit({
            authUser,
            authError: null,
          });
        },
        (authError) => {
          emit({
            authUser: null,
            authError,
          });
        },
      );

      const unsubscribe = noop;

      return unsubscribe;
    },
  );

  return authOnChangeChannel;
}
