import type { CSSObject, Theme } from '@mui/material/styles';
import { NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_BUTTON_SIZE_PIXELS } from '../constants/nav.constants';

/**
 * Round icon-button styles shared by the TreeViewItem icon container (applied
 * through the nav theme override) and the sticky breadcrumb expand/collapse
 * buttons, so both render identically. Takes only the theme's palette so it
 * accepts both the full theme (in `sx`) and the base theme handed to
 * `styleOverrides` callbacks.
 * @param theme - MUI theme (palette only).
 * @returns Expand/collapse button styles.
 */
export function getNavLeftDrawerTreeViewItemExpandButtonSx(
  theme: Pick<Theme, 'palette'>,
): CSSObject {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: `${NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_BUTTON_SIZE_PIXELS}px`,
    height: `${NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_BUTTON_SIZE_PIXELS}px`,
    borderRadius: '50%',
    '&:has(svg):hover': {
      backgroundColor: theme.palette.action.hover,
    },
  };
}
