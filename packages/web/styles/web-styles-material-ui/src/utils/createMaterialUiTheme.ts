import { createTheme, Theme } from '@mui/material';

const defaultTheme = createTheme();

function getThemeBreakpointValues(
  themeBreakpointValuesOverrides: Partial<Theme['breakpoints']['values']> = {},
): Theme['breakpoints']['values'] {
  return {
    ...defaultTheme.breakpoints.values,
    ...themeBreakpointValuesOverrides,
  };
}

export type GetThemeComponents = (theme: Theme) => Theme['components'];

export function createMaterialUiTheme(
  paletteOverrides: Partial<Theme['palette']> = {},
  themeBreakpointValuesOverrides: Partial<Theme['breakpoints']['values']> = {},
  getThemeComponents: GetThemeComponents = () => ({}),
): Theme {
  const baseTheme: Theme = createTheme({
    palette: paletteOverrides,
  });

  return createTheme(baseTheme, {
    components: getThemeComponents(baseTheme),
    breakpoints: {
      values: getThemeBreakpointValues(themeBreakpointValuesOverrides),
    },
  });
}
