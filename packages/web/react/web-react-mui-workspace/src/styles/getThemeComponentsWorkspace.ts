import { circularProgressClasses } from '@mui/material/CircularProgress';
import type { CSSObject, Theme } from '@mui/material/styles';
// Augments MUI's `Components` type with the X TreeView slots (MuiSimpleTreeView).
// https://mui.com/x/react-tree-view/quickstart/#theme-augmentation
import type {} from '@mui/x-tree-view/themeAugmentation';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import {
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_ICON_SIZE_PIXELS as EXPAND_ICON_SIZE_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_GAP_SPACING,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_RIGHT_SPACING,
} from '../constants/nav.constants';
import {
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE,
  CSS_CLASSNAME__NAV_LEFT_DRAWER_TREE_VIEW,
  CSS_CLASSNAME__WORKSPACE_TOP_TOOLBAR_BOX,
} from './cssClassNames';
import { getNavLeftDrawerTreeViewItemExpandButtonSx } from './getNavLeftDrawerTreeViewItemExpandButtonSx';
import { getNavLeftDrawerTreeViewItemRowSx } from './navLeftDrawerTreeViewItemStyles';

/**
 * Default MUI theme component overrides for the workspace. Consumer themes
 * spread the result into their own `getThemeComponents` to inherit the
 * styling; any override they declare afterwards deep-merges on top. Every
 * rule is scoped to a workspace class so it never leaks to other
 * <SimpleTreeView/>s, <Fab/>s, etc. the consumer app renders.
 * @returns The workspace theme component overrides.
 */
export function getThemeComponentsWorkspace(): Theme['components'] {
  return {
    MuiFab: {
      styleOverrides: {
        // Compact, uniform sizing for any action Fab inside the workspace top
        // toolbar, with a smaller icon to fit. A descendant selectois used
        // because the toolbar's content is slot-portaled through a
        // WorkspaceSlotBox, so the Fab sits a couple of wrappers deep.
        root: ({ theme }): CSSObject => {
          const fabSize = theme.spacing(4);

          return {
            [`.${CSS_CLASSNAME__WORKSPACE_TOP_TOOLBAR_BOX} &`]: {
              minHeight: 0,
              height: fabSize,
              width: fabSize,
              [`& .${svgIconClasses.root}`]: {
                fontSize: theme.spacing(2.5),
              },
              // A pending CircularProgress fills the Fab. MUI applies its `size`
              // as an inline style (default 40px), so `!important` is the only
              // way a stylesheet rule can override it and match the Fab.
              [`& .${circularProgressClasses.root}`]: {
                width: `${fabSize} !important`,
                height: `${fabSize} !important`,
              },
            },
          };
        },
      },
    },
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
