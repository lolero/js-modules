import type React from 'react';
import { PaperProvider } from 'react-native-paper';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { reactNativePaperThemes } from '../styles/styles.reactNativeThemes';
import { TravelLogNavigationContainer } from './TravelLogNavigationContainer';

export function TravelLogPaperProvider(): React.ReactNode {
  const { themePalette } = useStateMainReducerMetadata();

  return (
    <PaperProvider theme={reactNativePaperThemes[themePalette]}>
      <TravelLogNavigationContainer
        paperTheme={reactNativePaperThemes[themePalette]}
      />
    </PaperProvider>
  );
}
