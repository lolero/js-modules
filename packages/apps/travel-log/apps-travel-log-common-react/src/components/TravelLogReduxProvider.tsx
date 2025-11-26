import React from 'react';
import { Provider } from 'react-redux';
import { ReduxStore } from '@js-modules/apps-travel-log-common-store-redux';

type TravelLogReduxProviderProps = {
  reduxStore: ReduxStore;
  children: React.ReactNode;
};

export const TravelLogReduxProvider: React.FC<TravelLogReduxProviderProps> = ({
  reduxStore,
  children,
}) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
