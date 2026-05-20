import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

export type GetThemeComponents = (theme: Theme) => Theme['components'];

function getThemeBreakpointValues(
  breakpointsValuesOverrides: Partial<Theme['breakpoints']['values']> = {},
): Theme['breakpoints']['values'] {
  return {
    ...defaultTheme.breakpoints.values,
    ...breakpointsValuesOverrides,
  };
}

export type CreateMaterialUiThemeConfig = {
  paletteOverrides?: Partial<Theme['palette']>;
  typographyOverrides?: Partial<Theme['typography']>;
  shapeOverrides?: Partial<Theme['shape']>;
  shadowsOverrides?: Theme['shadows'];
  breakpointsValuesOverrides?: Partial<Theme['breakpoints']['values']>;
  getThemeComponents?: GetThemeComponents;
};

export function createMaterialUiTheme({
  paletteOverrides = {},
  typographyOverrides = {},
  shapeOverrides,
  shadowsOverrides,
  breakpointsValuesOverrides = {},
  getThemeComponents = () => ({}),
}: CreateMaterialUiThemeConfig): Theme {
  const baseTheme: Theme = createTheme({
    palette: paletteOverrides,
    typography: typographyOverrides,
    ...(shapeOverrides ? { shape: shapeOverrides } : {}),
    ...(shadowsOverrides ? { shadows: shadowsOverrides } : {}),
  });

  return createTheme(baseTheme, {
    components: getThemeComponents(baseTheme),
    breakpoints: {
      values: getThemeBreakpointValues(breakpointsValuesOverrides),
    },
  });
}
