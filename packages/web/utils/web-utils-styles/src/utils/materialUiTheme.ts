import { createTheme, PaletteOptions } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const palette: PaletteOptions = {
  mode: 'light',
};

const components: Components = {
  MuiButton: {
    styleOverrides: {
      iconSizeSmall: {
        '& > span:first-of-type': {
          fontSize: '1rem',
          marginBottom: '.1rem',
        },
      },
      iconSizeMedium: {
        '& > span:first-of-type': {
          fontSize: '1.1rem',
          marginBottom: '.1rem',
        },
      },
      iconSizeLarge: {
        '& > span:first-of-type': {
          fontSize: '1.2rem',
          marginBottom: '.1rem',
        },
      },
    },
  },
  MuiIcon: {
    styleOverrides: {
      root: {
        width: 'auto',
        height: 'auto',
        fontSize: '1.25rem',
        padding: '.25rem',
      },
      fontSizeSmall: {
        fontSize: '1rem',
      },
      fontSizeLarge: {
        fontSize: '1.75rem',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        width: '2em',
        height: '2em',
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
};

export const materialUiTheme = createTheme({
  components,
  palette,
});
