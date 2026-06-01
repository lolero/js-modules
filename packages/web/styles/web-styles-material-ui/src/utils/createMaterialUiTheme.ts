import type { Theme, ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

export type GetThemeComponents = (theme: Theme) => Theme['components'];

export type BreakpointsValuesOverrides = Partial<
  Theme['breakpoints']['values']
>;

function getThemeBreakpointValues(
  breakpointsValuesOverrides: Partial<Theme['breakpoints']['values']>,
): Theme['breakpoints']['values'] {
  return {
    ...defaultTheme.breakpoints.values,
    ...breakpointsValuesOverrides,
  };
}

export function createMaterialUiTheme(
  themeOptions: ThemeOptions,
  getThemeComponents: GetThemeComponents = () => ({}),
  breakpointsValuesOverrides: BreakpointsValuesOverrides = {},
): Theme {
  const baseTheme: Theme = createTheme(themeOptions);

  return createTheme(baseTheme, {
    components: getThemeComponents(baseTheme),
    breakpoints: {
      values: getThemeBreakpointValues(breakpointsValuesOverrides),
    },
  });
}
