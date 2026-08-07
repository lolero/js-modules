import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons/faAngleUp';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import isEqual from 'lodash/isEqual';
import union from 'lodash/union';
import type React from 'react';
import {
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { MuiFaIcon } from '@js-modules/web-react-mui';
import { useWebRouter } from '@js-modules/web-react-router';
import {
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_BUTTON_SIZE_PIXELS as EXPAND_BUTTON_SIZE_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_EXPAND_ICON_SIZE_PIXELS as EXPAND_ICON_SIZE_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_RIGHT_SPACING,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_INDENTATION_PIXELS,
  NAV_LEFT_DRAWER_TREE_VIEW_ITEM_PADDING_LEFT_BASE_PIXELS,
} from '../constants/nav.constants';
import { NavContext } from '../contexts/NavContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { useNavLeftDrawerStickyBreadcrumbsActiveLines } from '../hooks/useNavLeftDrawerStickyBreadcrumbsActiveLines';
import {
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE,
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE,
  CSS_CLASSNAME__NAV_LEFT_DRAWER_TREE_VIEW,
} from '../styles/cssClassNames';
import { getNavLeftDrawerTreeViewItemExpandButtonSx } from '../styles/getNavLeftDrawerTreeViewItemExpandButtonSx';
import {
  getNavLeftDrawerTreeViewItemRowSx,
  navLeftDrawerTreeViewItemIconSx,
  navLeftDrawerTreeViewItemLabelSx,
  navLeftDrawerTreeViewItemLinkSx,
} from '../styles/navLeftDrawerTreeViewItemStyles';
import type {
  ActiveLineTreeViewItemMetadata,
  TreeViewMetadata,
} from '../utils/getNavLeftDrawerTreeViewMetadata';

// Which edge a sticky breadcrumb is pinned to
const StickyBreadcrumbEdge = {
  header: 'header',
  footer: 'footer',
} as const;

type StickyBreadcrumbEdge =
  (typeof StickyBreadcrumbEdge)[keyof typeof StickyBreadcrumbEdge];

/**
 * Find a DOM element's the nearest ancestor that scrolls vertically.
 * @param element - The element to start searching upward from.
 * @returns The nearest scrollable ancestor, or null if none.
 */
function getScrollableParent(element: HTMLElement | null): HTMLElement | null {
  let htmlElement = element?.parentElement ?? null;
  while (htmlElement) {
    const { overflowY } = window.getComputedStyle(htmlElement);
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return htmlElement;
    }
    htmlElement = htmlElement.parentElement;
  }
  return null;
}

/**
 * Whether `path` is a descendant of `pathAncestor` in the TreeView.
 * @param path - Path in question.
 * @param pathAncestor - The potential ancestor path.
 * @param pathsParentByPath - Map of each tree path to its parent path.
 * @returns Whether `path` is a descendant of `pathAncestor`.
 */
function isDescendantOfAncestor(
  path: string,
  pathAncestor: string,
  pathsParentByPath: TreeViewMetadata['pathsParentByPath'],
): boolean {
  let pathParent: string | undefined = pathsParentByPath[path];
  while (pathParent !== undefined) {
    if (pathParent === pathAncestor) {
      return true;
    }
    pathParent = pathsParentByPath[pathParent];
  }
  return false;
}

/**
 * TreeViewItem expand icon, shown when an item is collapsed.
 * @returns The expand icon.
 */
function IconExpand(): React.ReactNode {
  return <MuiFaIcon icon={faAngleRight} fontSize="small" />;
}

/**
 * TreeViewItem collapse icon, shown when an item is expanded.
 * @returns The collapse icon.
 */
function IconCollapse(): React.ReactNode {
  return <MuiFaIcon icon={faAngleDown} fontSize="small" />;
}

// WATCH: react-compiler-computed-keys
// Hoisted so the key position holds a plain identifier.
const cssSelectorTreeItemContent = `& .${treeItemClasses.content}`;

const iconCompositionBoxSx = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  lineHeight: 0,
  '& svg': { fontSize: '12px' },
} as const;

const iconCompositionTopSx = {
  mb: '-4px',
} as const;

/**
 * Composite expand-all icon
 * @returns The expand-all icon.
 */
function IconExpandAll(): React.ReactNode {
  return (
    <Box sx={iconCompositionBoxSx}>
      <MuiFaIcon icon={faAngleUp} sx={iconCompositionTopSx} />
      <MuiFaIcon icon={faAngleDown} />
    </Box>
  );
}

/**
 * Composite collapse-all icon
 * @returns The collapse-all icon.
 */
function IconCollapseAll(): React.ReactNode {
  return (
    <Box sx={iconCompositionBoxSx}>
      <MuiFaIcon icon={faAngleDown} sx={iconCompositionTopSx} />
      <MuiFaIcon icon={faAngleUp} />
    </Box>
  );
}

type ExpandButtonProps = {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

/**
 * Round icon button backing the per-item and expand-all/collapse-all controls.
 * @param props - Component props.
 * @param props.ariaLabel - Aria label.
 * @param props.onClick - onClick callback.
 * @param props.children - Icon to render inside the button.
 * @param props.disabled - Whether the button is disabled.
 * @returns Expand/collapse button.
 */
function ExpandButton({
  ariaLabel,
  onClick,
  children,
  disabled,
}: ExpandButtonProps): React.ReactNode {
  const theme = useTheme();

  return (
    <Box
      component="button"
      type="button"
      aria-label={ariaLabel}
      title={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      sx={{
        p: 0,
        border: 0,
        color: 'inherit',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        '&:disabled': {
          opacity: 0.4,
          cursor: 'default',
          pointerEvents: 'none',
        },
        ...getNavLeftDrawerTreeViewItemExpandButtonSx(theme),
      }}
    >
      {children}
    </Box>
  );
}

type ActiveLineStickyBreadcrumbProps = {
  activeLineTreeViewItemMetadata: ActiveLineTreeViewItemMetadata;
  edge: StickyBreadcrumbEdge;
  isActive: boolean;
  isExpanded: boolean;
  isNavLeftDrawerExpanded: boolean;
  treeViewItemHeightMin: string;
  onExpandedItemsChange: (itemPath: string) => void;
};

/**
 * Sticky breadcrumb for active line TreeViewItem pinned at the top or bottom
 * edge of the scrolled tree view, mirroring the look of its real TreeViewItem.
 * @param props - Component props.
 * @param props.activeLineTreeViewItemMetadata - ActiveLineTreeViewItemMetadata
 * @param props.edge - Which edge the breadcrumb is pinned to.
 * @param props.isActive - Whether the TreeViewItem is the active leaf.
 * @param props.isExpanded - Whether the TreeViewItem item is expanded.
 * @param props.isNavLeftDrawerExpanded - Whether the LeftNavDrawer is expanded.
 * @param props.treeViewItemHeightMin - Minimum TreeViewItem height.
 * @param props.onExpandedItemsChange - TreeViewItem expansion change callback.
 * @returns The sticky breadcrumb row.
 */
function ActiveLineStickyBreadcrumb({
  activeLineTreeViewItemMetadata,
  edge,
  isActive,
  isExpanded,
  isNavLeftDrawerExpanded,
  treeViewItemHeightMin,
  onExpandedItemsChange,
}: ActiveLineStickyBreadcrumbProps): React.ReactNode {
  const { path, icon, label, depth, isExpandable } =
    activeLineTreeViewItemMetadata;
  const { LinkComponent } = useWebRouter();
  const theme = useTheme();
  let borderRightWidth = 0;
  if (isActive) {
    borderRightWidth = 4;
  } else if (isExpandable && !isExpanded) {
    borderRightWidth = 2;
  }

  return (
    <Box
      data-sticky-breadcrumb-path={path}
      data-sticky-breadcrumb-edge={edge}
      sx={{
        ...getNavLeftDrawerTreeViewItemRowSx(theme),
        display: 'flex',
        alignItems: 'center',
        minHeight: treeViewItemHeightMin,
        pr: isExpandable
          ? NAV_LEFT_DRAWER_TREE_VIEW_ITEM_CONTENT_PADDING_RIGHT_SPACING
          : 0,
        borderColor: 'primary.main',
        borderRightStyle: 'solid',
        borderRightWidth: `${borderRightWidth}px`,
      }}
    >
      <ButtonBase
        component={LinkComponent}
        href={path}
        title={isNavLeftDrawerExpanded ? undefined : label}
        sx={{
          ...navLeftDrawerTreeViewItemLinkSx,
          flexGrow: 1,
          minWidth: 0,
          alignSelf: 'stretch',
          pl: `${NAV_LEFT_DRAWER_TREE_VIEW_ITEM_PADDING_LEFT_BASE_PIXELS + NAV_LEFT_DRAWER_TREE_VIEW_ITEM_INDENTATION_PIXELS * depth}px`,
          color: 'primary.main',
        }}
      >
        <MuiFaIcon icon={icon} sx={navLeftDrawerTreeViewItemIconSx} />
        {isNavLeftDrawerExpanded && (
          <Typography variant="body1" sx={navLeftDrawerTreeViewItemLabelSx}>
            {label}
          </Typography>
        )}
      </ButtonBase>
      {isExpandable && (
        <ExpandButton
          ariaLabel={isExpanded ? 'Collapse' : 'Expand'}
          onClick={() => {
            onExpandedItemsChange(path);
          }}
        >
          <MuiFaIcon
            icon={isExpanded ? faAngleDown : faAngleRight}
            sx={{ fontSize: `${EXPAND_ICON_SIZE_PIXELS}px` }}
          />
        </ExpandButton>
      )}
    </Box>
  );
}

export type NavLeftDrawerTreeViewProps = {
  treeViewMetadata: TreeViewMetadata;
};

/**
 * Renders the <NavLeftDrawer />'s navigation TreeView, wiring expansion state,
 * active path, and sticky breadcrumbs for active line's TreeViewItems.
 * @param props - Component props.
 * @param props.treeViewMetadata - TreeViewMetadata
 * @returns The navigation TreeView.
 */
export function NavLeftDrawerTreeView({
  treeViewMetadata,
}: NavLeftDrawerTreeViewProps): React.ReactNode {
  const {
    activeLineTreeViewItemMetadatas,
    pathActive,
    pathsExpandable,
    pathsExpandedActive,
    pathsParentByPath,
    treeViewItems,
  } = treeViewMetadata;
  const { isNavLeftDrawerExpanded } = useNavDisplayMetadata();
  const { navLeftDrawerTreeViewItemHeightMin } = useContext(NavContext);
  const theme = useTheme();
  const treeRef = useRef<HTMLUListElement>(null);
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const stickyBreadcrumbExpandingPathRef = useRef<string | null>(null);

  const [expandedItems, setExpandedItems] =
    useState<string[]>(pathsExpandedActive);

  // Whenever the active route changes its default-expanded ancestors, fold them
  // into the controlled expansion while preserving the user's own toggles. Done
  // during render (recommended pattern for syncing state to a changing prop)
  // rather than in an effect, and guarded so it runs only on an actual change.
  const [syncedPathsExpandedActive, setSyncedPathsExpandedActive] =
    useState<string[]>(pathsExpandedActive);
  if (!isEqual(syncedPathsExpandedActive, pathsExpandedActive)) {
    setSyncedPathsExpandedActive(pathsExpandedActive);
    setExpandedItems((previousExpandedItems) =>
      union(previousExpandedItems, pathsExpandedActive),
    );
  }

  useLayoutEffect(() => {
    scrollContainerRef.current = getScrollableParent(treeRef.current);
  }, []);

  const onExpandedItemsChangeStickyBreadcrumbCallback = useCallback(
    (itemPath: string) => {
      // When a header breadcrumb is expanded, flag its path so the layout
      // effect can scroll that crumb's subtree into view.
      if (!expandedItems.includes(itemPath)) {
        stickyBreadcrumbExpandingPathRef.current = itemPath;
      }
      setExpandedItems((previousExpandedItems) =>
        previousExpandedItems.includes(itemPath)
          ? previousExpandedItems.filter(
              (path) =>
                path !== itemPath &&
                !isDescendantOfAncestor(path, itemPath, pathsParentByPath),
            )
          : [...previousExpandedItems, itemPath],
      );
    },
    [expandedItems, pathsParentByPath],
  );

  const onExpandedItemsChangeCallback = useCallback(
    (itemIds: string[]) => {
      setExpandedItems((previousExpandedItems) => {
        const collapsedItemPaths = previousExpandedItems.filter(
          (path) => !itemIds.includes(path),
        );
        if (collapsedItemPaths.length === 0) {
          return itemIds;
        }

        return itemIds.filter(
          (path) =>
            !collapsedItemPaths.some((collapsedItemPath) =>
              isDescendantOfAncestor(
                path,
                collapsedItemPath,
                pathsParentByPath,
              ),
            ),
        );
      });
    },
    [pathsParentByPath],
  );

  const showExpandCollapseButtons = pathsExpandable.length > 0;
  const expandedItemsSet = new Set(expandedItems);
  const isAllExpanded = pathsExpandable.every((path) =>
    expandedItemsSet.has(path),
  );
  const isAllCollapsed = expandedItems.length === 0;
  // Half the button straddles below the boundary, so reserve that much at the
  // top of the tree and the sticky header.
  const headerOffset = showExpandCollapseButtons
    ? EXPAND_BUTTON_SIZE_PIXELS / 2
    : 0;

  // After expanding a sticky breadcrumb, scroll its TreeViewItem into the
  // breadcrumb's position.
  // - header crumb: align the row's top, so the revealed children fill the
  // band beneath it
  // - footer crumb: align the row's bottom one crumb-height above the fold so
  // the expanded item's own row sits one row above the bottom edge
  useLayoutEffect(() => {
    const expandingPath = stickyBreadcrumbExpandingPathRef.current;
    stickyBreadcrumbExpandingPathRef.current = null;
    if (!expandingPath) {
      return;
    }
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }
    const expandingCrumb = Array.from(
      scrollContainer.querySelectorAll<HTMLElement>(
        '[data-sticky-breadcrumb-path]',
      ),
    ).find((crumb) => crumb.dataset.stickyBreadcrumbPath === expandingPath);
    const expandingIndex = activeLineTreeViewItemMetadatas.findIndex(
      (metadata) => metadata.path === expandingPath,
    );
    if (!expandingCrumb || expandingIndex < 0) {
      return;
    }
    const expandingRow = scrollContainer.querySelectorAll<HTMLElement>(
      `.${CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE} > .${treeItemClasses.content}, .${CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE} > .${treeItemClasses.content}`,
    )[expandingIndex];
    if (!expandingRow) {
      return;
    }
    const expandingCrumbRect = expandingCrumb.getBoundingClientRect();
    const expandingRowRect = expandingRow.getBoundingClientRect();
    const expandingRowEdge =
      expandingCrumb.dataset.stickyBreadcrumbEdge ===
      StickyBreadcrumbEdge.header
        ? expandingRowRect.top
        : expandingRowRect.bottom;
    scrollContainer.scrollBy({
      top: expandingRowEdge - expandingCrumbRect.top,
    });
  }, [expandedItems, activeLineTreeViewItemMetadatas]);

  const { activeLineHeader, activeLineFooter } =
    useNavLeftDrawerStickyBreadcrumbsActiveLines(
      scrollContainerRef,
      treeRef,
      activeLineTreeViewItemMetadatas,
      headerOffset,
    );

  return (
    <>
      {showExpandCollapseButtons && (
        <Box
          sx={{
            position: 'absolute',
            top: `${-(EXPAND_BUTTON_SIZE_PIXELS / 2)}px`,
            right: theme.spacing(1),
            zIndex: 3,
            display: 'flex',
            gap: 0.5,
            '& > button': {
              backgroundColor: 'background.paper',
              borderStyle: 'solid',
              borderWidth: '1px',
              borderColor: 'divider',
              // Keep the opaque paper fill and layer the hover tint over it
              // (instead of the shared caret's hover replacing it and going
              // translucent).
              '&:has(svg):hover': {
                backgroundColor: 'background.paper',
                backgroundImage: `linear-gradient(${theme.palette.action.hover}, ${theme.palette.action.hover})`,
              },
            },
          }}
        >
          <ExpandButton
            ariaLabel="Collapse all"
            disabled={isAllCollapsed}
            onClick={() => {
              setExpandedItems([]);
            }}
          >
            <IconCollapseAll />
          </ExpandButton>
          <ExpandButton
            ariaLabel="Expand all"
            disabled={isAllExpanded}
            onClick={() => {
              setExpandedItems(pathsExpandable);
            }}
          >
            <IconExpandAll />
          </ExpandButton>
        </Box>
      )}
      {activeLineHeader.length > 0 && (
        <Box sx={{ position: 'sticky', top: 0, height: 0, zIndex: 2 }}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              paddingTop: `${headerOffset}px`,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            {activeLineHeader.map((activeLineTreeViewItemMetadata) => {
              const { path } = activeLineTreeViewItemMetadata;
              return (
                <ActiveLineStickyBreadcrumb
                  key={path}
                  activeLineTreeViewItemMetadata={
                    activeLineTreeViewItemMetadata
                  }
                  edge={StickyBreadcrumbEdge.header}
                  isActive={path === pathActive}
                  isExpanded={expandedItems.includes(path)}
                  isNavLeftDrawerExpanded={isNavLeftDrawerExpanded}
                  treeViewItemHeightMin={navLeftDrawerTreeViewItemHeightMin}
                  onExpandedItemsChange={
                    onExpandedItemsChangeStickyBreadcrumbCallback
                  }
                />
              );
            })}
          </Box>
        </Box>
      )}
      <SimpleTreeView
        ref={treeRef}
        className={CSS_CLASSNAME__NAV_LEFT_DRAWER_TREE_VIEW}
        selectedItems={pathActive}
        expandedItems={expandedItems}
        itemChildrenIndentation={
          NAV_LEFT_DRAWER_TREE_VIEW_ITEM_INDENTATION_PIXELS
        }
        expansionTrigger="iconContainer"
        slots={{
          expandIcon: IconExpand,
          collapseIcon: IconCollapse,
        }}
        onExpandedItemsChange={(_event, itemIds) => {
          onExpandedItemsChangeCallback(itemIds);
        }}
        sx={{
          paddingTop: `${headerOffset}px`,
          [cssSelectorTreeItemContent]: {
            // Min-height drives single-line rows; rows grow when labels wrap.
            minHeight: navLeftDrawerTreeViewItemHeightMin,
          },
        }}
      >
        {treeViewItems}
      </SimpleTreeView>
      {activeLineFooter.length > 0 && (
        <Box sx={{ position: 'sticky', bottom: 0, height: 0, zIndex: 2 }}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'background.paper',
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            {activeLineFooter.map((activeLineTreeViewItemMetadata) => {
              const { path } = activeLineTreeViewItemMetadata;
              return (
                <ActiveLineStickyBreadcrumb
                  key={path}
                  activeLineTreeViewItemMetadata={
                    activeLineTreeViewItemMetadata
                  }
                  edge={StickyBreadcrumbEdge.footer}
                  isActive={path === pathActive}
                  isExpanded={expandedItems.includes(path)}
                  isNavLeftDrawerExpanded={isNavLeftDrawerExpanded}
                  treeViewItemHeightMin={navLeftDrawerTreeViewItemHeightMin}
                  onExpandedItemsChange={
                    onExpandedItemsChangeStickyBreadcrumbCallback
                  }
                />
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
}
