import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogNavigationContainer } from './TravelLogNavigationContainer';
import { reactNativePaperThemes } from '../styles/styles.reactNativeThemes';

export const TravelLogPaperProvider: React.FC = () => {
  const { themePalette } = useStateMainReducerMetadata();

  return (
    <PaperProvider theme={reactNativePaperThemes[themePalette]}>
      <TravelLogNavigationContainer
        paperTheme={reactNativePaperThemes[themePalette]}
      />
    </PaperProvider>
  );
};
