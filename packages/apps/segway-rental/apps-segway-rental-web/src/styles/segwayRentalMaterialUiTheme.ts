import { createTheme, Theme } from '@mui/material/styles';
import { tabsClasses } from '@mui/material/Tabs';
import { tabClasses } from '@mui/material/Tab';

const lightBaseTheme = createTheme({
  palette: {},
});

const darkBaseTheme = createTheme({
  palette: {},
});

const getThemeComponents = (baseTheme: Theme): Theme['components'] => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          [`&.${tabsClasses.root}`]: {
            minHeight: 0,
            overflow: 'auto',
          },
          [`& .${tabClasses.root}`]: {
            borderRadius: `${baseTheme.spacing(1)} ${baseTheme.spacing(1)} 0 0`,
          },
        },
        vertical: {
          [`& .${tabClasses.root}`]: {
            borderRadius: 0,
          },
          [`& .${tabClasses.selected}`]: {
            borderColor: 'transparent !important',
            borderWidth: '0 !important',
            borderStyle: 'none !important',
          },
        },
        flexContainer: {
          overflow: 'auto',
        },
        indicator: {
          display: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          [`&.${tabClasses.root}`]: {
            textTransform: 'none',
            minHeight: 0,
            height: baseTheme.spacing(4.25),
            '&:hover': {
              textDecoration: 'none',
            },
          },
          [`&.${tabClasses.selected}`]: {
            backgroundColor: baseTheme.palette.background.default,
            color: baseTheme.palette.text.primary,
            borderColor: baseTheme.palette.divider,
            borderWidth: '2px 2px 0 2px',
            borderStyle: 'solid',
            cursor: 'default',
            pointerEvents: 'none',
            '&:hover': {
              backgroundColor: baseTheme.palette.background.default,
              color: baseTheme.palette.text.primary,
            },
          },
        },
      },
    },
  };
};

export const lightTheme = createTheme(lightBaseTheme, {
  components: getThemeComponents(lightBaseTheme),
});

export const darkTheme = createTheme(darkBaseTheme, {
  components: getThemeComponents(darkBaseTheme),
});
