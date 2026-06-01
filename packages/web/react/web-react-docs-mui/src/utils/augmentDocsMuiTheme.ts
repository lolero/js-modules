import type { Theme } from '@mui/material/styles';
import { alpha, darken, lighten } from '@mui/material/styles';
import type { CSSObject } from '@mui/system';

// The verbatim MUI docs examples are authored against MUI's docs-infra branding
// theme, which extends the palette with numeric color shades (50–900), a
// `primaryDark` scale and `gradients`, plus an `applyDarkStyles` helper. App
// themes don't carry these, so we layer them onto the selected theme before
// rendering the examples — keeping the app's own colors while satisfying the
// tokens the examples read.
// https://github.com/mui/material-ui/blob/master/docs/src/modules/brandingTheme.ts
declare module '@mui/material/styles' {
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }

  interface Palette {
    primaryDark: Record<number, string>;
    gradients: { linearSubtle: string };
  }

  interface PaletteOptions {
    primaryDark?: Record<number, string>;
    gradients?: { linearSubtle: string };
  }

  interface Theme {
    applyDarkStyles: (css: CSSObject) => CSSObject;
  }

  interface ThemeOptions {
    applyDarkStyles?: (css: CSSObject) => CSSObject;
  }
}

// Coefficients tuned to approximate MUI's branding color ramp around `main` (500).
const SHADE_LIGHTEN_COEFFICIENTS: Record<number, number> = {
  50: 0.9,
  100: 0.8,
  200: 0.6,
  300: 0.4,
  400: 0.2,
};

const SHADE_DARKEN_COEFFICIENTS: Record<number, number> = {
  600: 0.15,
  700: 0.3,
  800: 0.45,
  900: 0.6,
};

// MUI's fixed branding navy scale, used by the examples as a structural color
// independent of the active palette.
const PRIMARY_DARK: Record<number, string> = {
  50: '#E2EDF8',
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
  800: '#001E3C',
  900: '#0A1929',
};

function generateColorShades(mainColor: string): Record<number, string> {
  const shades: Record<number, string> = { 500: mainColor };

  Object.entries(SHADE_LIGHTEN_COEFFICIENTS).forEach(([shade, coefficient]) => {
    shades[Number(shade)] = lighten(mainColor, coefficient);
  });
  Object.entries(SHADE_DARKEN_COEFFICIENTS).forEach(([shade, coefficient]) => {
    shades[Number(shade)] = darken(mainColor, coefficient);
  });

  return shades;
}

export function augmentDocsMuiTheme(theme: Theme): Theme {
  const { palette } = theme;
  const isDark = palette.mode === 'dark';

  return {
    ...theme,
    palette: {
      ...palette,
      primary: {
        ...palette.primary,
        ...generateColorShades(palette.primary.main),
      },
      secondary: {
        ...palette.secondary,
        ...generateColorShades(palette.secondary.main),
      },
      error: { ...palette.error, ...generateColorShades(palette.error.main) },
      warning: {
        ...palette.warning,
        ...generateColorShades(palette.warning.main),
      },
      info: { ...palette.info, ...generateColorShades(palette.info.main) },
      success: {
        ...palette.success,
        ...generateColorShades(palette.success.main),
      },
      primaryDark: PRIMARY_DARK,
      gradients: {
        linearSubtle: isDark
          ? `linear-gradient(to top right, ${alpha(PRIMARY_DARK[700], 0.2)} 40%, ${alpha(PRIMARY_DARK[800], 0)} 100%)`
          : `linear-gradient(to top right, ${alpha(lighten(palette.primary.main, 0.9), 0.5)} 40%, ${alpha(lighten(palette.primary.main, 0.9), 0)} 100%)`,
      },
    },
    applyDarkStyles(css: CSSObject): CSSObject {
      return isDark ? css : {};
    },
  };
}
