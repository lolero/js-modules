import { createTheme, Theme } from '@mui/material/styles';

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

export type CreateMaterialUiThemeConfig = {
  paletteOverrides?: Partial<Theme['palette']>;
  typographyOverrides?: Partial<Theme['typography']>;
  getThemeComponents?: GetThemeComponents;
  themeBreakpointValuesOverrides?: Partial<Theme['breakpoints']['values']>;
};

export function createMaterialUiTheme({
  getThemeComponents = () => ({}),
  paletteOverrides = {},
  typographyOverrides = {},
  themeBreakpointValuesOverrides = {},
}: CreateMaterialUiThemeConfig): Theme {
  const baseTheme: Theme = createTheme({
    palette: paletteOverrides,
    typography: typographyOverrides,
  });

  return createTheme(baseTheme, {
    components: getThemeComponents(baseTheme),
    breakpoints: {
      values: getThemeBreakpointValues(themeBreakpointValuesOverrides),
    },
  });
}
