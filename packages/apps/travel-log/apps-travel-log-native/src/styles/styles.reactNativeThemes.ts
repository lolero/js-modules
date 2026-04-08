// import {
//   DarkTheme as NavigationDarkTheme,
//   DefaultTheme as NavigationLightTheme,
// } from '@react-navigation/native';
import {
  // adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper/src/types';
import { ThemePalette } from '@js-modules/apps-travel-log-common-constants';

// const { LightTheme, DarkTheme } = adaptNavigationTheme({
//   reactNavigationLight: NavigationLightTheme,
//   reactNavigationDark: NavigationDarkTheme,
// });

export const reactNativePaperThemes: Record<ThemePalette, MD3Theme> = {
  [ThemePalette.light]: MD3LightTheme,
  [ThemePalette.dark]: MD3DarkTheme,
};

// export const reactNativePaperThemes: Record<ThemePalette, MD3Theme> = {
//   [ThemePalette.light]: {
//     ...MD3LightTheme,
//     ...LightTheme,
//     colors: {
//       ...MD3LightTheme.colors,
//       ...LightTheme.colors,
//     },
//   } as unknown as MD3Theme,
//   [ThemePalette.dark]: {
//     ...MD3DarkTheme,
//     ...DarkTheme,
//     colors: {
//       ...MD3DarkTheme.colors,
//       ...DarkTheme.colors,
//     },
//   } as unknown as MD3Theme,
// };
