import React, { useMemo } from 'react';
import {
  DefaultTheme as ThemeDefaultLight,
  DarkTheme as ThemeDefaultDark,
  NavigationContainer,
} from '@react-navigation/native';
import { MD3Theme } from 'react-native-paper/src/types';
import { adaptNavigationTheme } from 'react-native-paper';
import { useStateMainReducerMetadata } from '@js-modules/apps-travel-log-common-store-redux';
import { TravelLogStackNavigator } from './TravelLogStackNavigator';

export type TravelLogNavigationContainerProps = {
  paperTheme: MD3Theme;
};

export const TravelLogNavigationContainer: React.FC<
  TravelLogNavigationContainerProps
> = ({ paperTheme }) => {
  const { themePalette } = useStateMainReducerMetadata();

  const theme = useMemo(() => {
    const isLightTheme = themePalette === 'light';
    const isDarkTheme = !isLightTheme;

    const { LightTheme, DarkTheme } = adaptNavigationTheme({
      reactNavigationLight: ThemeDefaultLight,
      reactNavigationDark: ThemeDefaultDark,
      materialLight: isLightTheme ? paperTheme : undefined,
      materialDark: isDarkTheme ? paperTheme : undefined,
    });

    const themeTemp = isLightTheme ? LightTheme : DarkTheme;

    return themeTemp;
  }, [paperTheme, themePalette]);

  return (
    <NavigationContainer theme={theme}>
      <TravelLogStackNavigator />
    </NavigationContainer>
  );
};
