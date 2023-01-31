import { createTheme, Theme } from '@mui/material';

const defaultTheme = createTheme();

export type GetThemeComponents = (theme: Theme) => Theme['components'];

function getThemeBreakpointValues(
  themeBreakpointValuesOverrides: Partial<Theme['breakpoints']['values']> = {},
): Theme['breakpoints']['values'] {
  return {
    ...defaultTheme.breakpoints.values,
    ...themeBreakpointValuesOverrides,
  };
}

export function createMaterialUiTheme(
  paletteOverrides: Partial<Theme['palette']> = {},
  getThemeComponents: GetThemeComponents = () => ({}),
  themeBreakpointValuesOverrides: Partial<Theme['breakpoints']['values']> = {},
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
