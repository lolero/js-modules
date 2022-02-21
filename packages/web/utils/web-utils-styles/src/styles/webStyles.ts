import { green } from '@mui/material/colors';

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

export const inactiveFabSx = {
  backgroundColor: 'background.default',
  boxShadow: 'none',
  cursor: 'default',
  '&:hover, &:active': {
    backgroundColor: 'background.default',
    boxShadow: 'none',
  },
} as const;

export const dropzoneBackdrop = {
  position: 'absolute',
  backgroundColor: green.A200,
  opacity: '0.5 !important',
} as const;
