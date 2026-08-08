import {
  NavigationContainer,
  DarkTheme as ThemeDefaultDark,
  DefaultTheme as ThemeDefaultLight,
} from '@react-navigation/native';
import type React from 'react';
import { adaptNavigationTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper/src/types';
import {
  ThemePalette,
  WebModulesPublic,
} from '@js-modules/apps-travel-log-common-constants';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogStackNavigator } from './TravelLogStackNavigator';

export type TravelLogNavigationContainerProps = {
  paperTheme: MD3Theme;
};

export function TravelLogNavigationContainer({
  paperTheme,
}: TravelLogNavigationContainerProps): React.ReactNode {
  const { themePalette } = useStateMainReducerMetadata();

  const isLightTheme = themePalette === ThemePalette.light;
  const isDarkTheme = !isLightTheme;

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: ThemeDefaultLight,
    reactNavigationDark: ThemeDefaultDark,
    materialLight: isLightTheme ? paperTheme : undefined,
    materialDark: isDarkTheme ? paperTheme : undefined,
  });

  const theme = isLightTheme ? LightTheme : DarkTheme;

  const linking = {
    prefixes: ['travellog://'],
    config: {
      screens: {
        [WebModulesPublic.home]: 'oauth-callback',
      },
    },
  };

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <TravelLogStackNavigator />
    </NavigationContainer>
  );
}
