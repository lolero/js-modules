import type { Theme } from '@mui/material/styles';
// Augments MUI's `Components` type with the X TreeView slots (MuiSimpleTreeView).
// https://mui.com/x/react-tree-view/quickstart/#theme-augmentation
import type {} from '@mui/x-tree-view/themeAugmentation';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_ICON_SIZE_PIXELS as EXPAND_ICON_SIZE_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_GAP_SPACING,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_RIGHT_SPACING,
} from '../constants/nav.constants';
import {
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE,
  CSS_CLASSNAME__NAV_LEFT_DRAWER_TREE_VIEW,
} from '../utils/getNavLeftDrawerTreeViewMetadata';
import { getNavLeftDrawerTreeViewItemExpandButtonSx } from './getNavLeftDrawerTreeViewItemExpandButtonSx';
import { getNavLeftDrawerTreeViewItemRowSx } from './navLeftDrawerTreeViewItemStyles';

/**
 * Default MUI theme component overrides for the <NavLeftDrawer/> TreeView.
 * Consumer themes spread the result into their own `getThemeComponents` to
 * inherit the nav's TreeView styling; any override they declare afterwards
 * deep-merges on top. Every rule is scoped to the nav TreeView's own class so
 * it never leaks to other <SimpleTreeView/>s the consumer app renders.
 * @returns The nav TreeView theme component overrides.
 */
export function getThemeComponentsWorkspace(): Theme['components'] {
  return {
    MuiSimpleTreeView: {
      styleOverrides: {
        root: ({ theme }) => ({
          [`&.${CSS_CLASSNAME__NAV_LEFT_DRAWER_TREE_VIEW}`]: {
            [`& .${treeItemClasses.iconContainer}`]: {
              order: 1,
              marginLeft: 'auto',
              alignSelf: 'center',
              cursor: 'pointer',
              '& svg': {
                fontSize: `${EXPAND_ICON_SIZE_PIXELS}px`,
              },
              ...getNavLeftDrawerTreeViewItemExpandButtonSx(theme),
            },
            // Hide leaf row caret empty container
            [`& .${treeItemClasses.iconContainer}:not(:has(svg))`]: {
              display: 'none',
            },
            // The label slot fills the row so the link's click area spans the
            // full (possibly multi-line) height.
            [`& .${treeItemClasses.label}`]: {
              display: 'flex',
              alignSelf: 'stretch',
            },
            [`& .${treeItemClasses.content}`]: {
              ...getNavLeftDrawerTreeViewItemRowSx(theme),
              borderRadius: 0,
              alignItems: 'stretch',
              // Tighten inert label-to-caret distance
              gap: theme.spacing(
                NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_GAP_SPACING,
              ),
              // Tighten inert caret-to-edge padding
              paddingRight: theme.spacing(
                NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_RIGHT_SPACING,
              ),
              backgroundColor: 'transparent',
              borderRight: '4px solid transparent',
              // Drop caret-to-edge padding when caret is hidden
              [`&:not(:has(.${treeItemClasses.iconContainer} svg))`]: {
                paddingRight: 0,
              },
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              // Suppress MUI's default focus background, but only while not
              // hovered — otherwise focusing a row (e.g. clicking its border)
              // would override the row hover and kill the highlight until focus
              // moves elsewhere.
              '&[data-focused]:not(:hover)': {
                backgroundColor: 'transparent',
              },
              '&[data-selected]': {
                backgroundColor: 'transparent',
                borderRightColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              },
              // Suppress MUI's default focus background, but only while not
              // hovered — otherwise focusing a row (e.g. clicking its border)
              // would override the row hover and kill the highlight until focus
              // moves elsewhere.
              '&[data-selected][data-focused]:not(:hover)': {
                backgroundColor: 'transparent',
              },
            },
            [`& .${CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE} > .${treeItemClasses.content}:not([data-expanded]):not([data-selected])`]:
              {
                borderRightWidth: '2px',
                borderRightColor: theme.palette.primary.main,
              },
          },
        }),
      },
    },
  };
}
