import { PaletteOptions } from '@mui/material';
import { Components } from '@mui/material/styles/components';

const palette: PaletteOptions = {
  mode: 'light',
};

const components: Components = {
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
  },
};

export const themeOptions = {
  components,
  palette,
};
