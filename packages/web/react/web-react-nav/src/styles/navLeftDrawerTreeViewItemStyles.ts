import type { CSSObject, Theme } from '@mui/material/styles';
import {
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_Y_SPACING,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_LABEL_PADDING_Y_SPACING,
} from '../constants/nav.constants';

/**
 * Shared base styles for a nav TreeView row — used by both the real
 * TreeViewItem content (through the theme override) and the sticky breadcrumb
 * row — so the two stay identical. The right padding, caret column,
 * indentation, color and active-state indicator are layered on per call site.
 * @param theme - MUI theme (spacing + palette).
 * @returns The row's shared base styles.
 */
export function getNavLeftDrawerTreeViewItemRowSx(
  theme: Pick<Theme, 'spacing' | 'palette'>,
): CSSObject {
  return {
    cursor: 'default',
    paddingTop: theme.spacing(
      NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_Y_SPACING,
    ),
    paddingBottom: theme.spacing(
      NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_Y_SPACING,
    ),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  };
}

/**
 * Shared layout for a nav TreeView row's navigation link (the ButtonBase),
 * used by both the real TreeViewItem and the sticky breadcrumb. Horizontal
 * padding, color and sizing are layered on per call site.
 */
export const navLeftDrawerTreeViewItemLinkSx = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: 1,
  py: NAV_LEFT_DRAWER_TREE_VIEW_ITEM_LABEL_PADDING_Y_SPACING,
  textDecoration: 'none',
} as const;

/**
 * Shared styles for a nav TreeView row's label text, used by both the real
 * TreeViewItem and the sticky breadcrumb so long labels break the same way.
 */
export const navLeftDrawerTreeViewItemLabelSx = {
  lineHeight: 1.25,
  minWidth: 0,
  overflowWrap: 'break-word',
} as const;
