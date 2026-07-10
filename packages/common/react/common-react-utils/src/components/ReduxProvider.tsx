import type React from 'react';
import { Provider } from 'react-redux';
import type { Store } from 'redux';

type ReduxProviderProps = {
  reduxStore: Store;
  children: React.ReactNode;
};

export function ReduxProvider({
  reduxStore,
  children,
}: ReduxProviderProps): React.ReactNode {
  return <Provider store={reduxStore}>{children}</Provider>;
}
