import { autocompleteClasses } from '@mui/material';

export const menuItemSx = {
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItemLabelBox: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '0.5em',
  },
  menuItemIcon: {
    width: '2em',
    textAlign: 'left',
  },
} as const;

export const autocompleteSx = {
  [`& .${autocompleteClasses.endAdornment}`]: {
    top: 'inherit',
  },
} as const;

export const inactiveFabSx = {
  backgroundColor: 'background.default',
  boxShadow: 'none',
  cursor: 'default',
  '&:hover, &:active': {
    backgroundColor: 'background.default',
    boxShadow: 'none',
  },
} as const;
