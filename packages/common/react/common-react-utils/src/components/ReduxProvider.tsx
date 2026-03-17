import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

type ReduxProviderProps = {
  reduxStore: Store;
  children: React.ReactNode;
};

export const ReduxProvider: React.FC<ReduxProviderProps> = ({
  reduxStore,
  children,
}) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
