import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import type { RefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE,
  CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE,
} from '../styles/cssClassNames';
import type { ActiveLineTreeViewItemMetadata } from '../utils/getNavLeftDrawerTreeViewMetadata';

export type NavLeftDrawerStickyBreadcrumbsActiveLines = {
  activeLineHeader: ActiveLineTreeViewItemMetadata[];
  activeLineFooter: ActiveLineTreeViewItemMetadata[];
  isActiveLeafSubtreeInView: boolean;
};

type StickyBreadcrumbsMetadata = {
  countAbove: number;
  countBelow: number;
  countRows: number;
  isActiveLeafSubtreeInView: boolean;
};

/**
 * React hook that measures which <NavLeftDrawer/> active line TreeViewItems
 * are scrolled out of view above or below the scroll container, so they can
 * be rendered as persistent sticky breadcrumbs. The active line rows are
 * pinned progressively, so each crumb appears only once its real row is
 * hidden behind the crumbs already stacked at that edge.
 * @param scrollContainerRef - Ref to the scrollable container of the TreeView.
 * @param contentRef - Ref to the TreeView content inside the scroll container,
 * whose height changes (e.g. while expand/collapse animates) must re-measure.
 * @param activeLine - ActiveLineTreeViewItemMetadatas sorted from root to active.
 * @param headerOffset - Space reserved at the top of the scroll container
 * (below which the header crumbs are pinned).
 * @returns The active line TreeViewItems scrolled out of view above and below,
 * plus whether the active leaf's subtree currently reaches into view.
 */
export function useNavLeftDrawerStickyBreadcrumbsActiveLines(
  scrollContainerRef: RefObject<HTMLElement | null>,
  contentRef: RefObject<HTMLElement | null>,
  activeLine: ActiveLineTreeViewItemMetadata[],
  headerOffset: number,
): NavLeftDrawerStickyBreadcrumbsActiveLines {
  const [stickyBreadcrumbsMetadata, setStickyBreadcrumbsMetadata] =
    useState<StickyBreadcrumbsMetadata>({
      countAbove: 0,
      countBelow: 0,
      countRows: 0,
      isActiveLeafSubtreeInView: false,
    });

  const updateStickyBreadcrumbsMetadata = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return;
    }

    const rowsActiveLine = scrollContainer.querySelectorAll<HTMLElement>(
      `.${CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE_LINE} > .${treeItemClasses.content}, .${CSS_CLASSNAME__NAV_LEFT_DRAWER_ACTIVE} > .${treeItemClasses.content}`,
    );
    const countRows = rowsActiveLine.length;
    const scrollContainerRect = scrollContainer.getBoundingClientRect();

    // A row is pinned to the header only once it is fully behind the crumbs
    // already stacked above it (its bottom edge has cleared their bottom edge),
    // so a crumb never appears while its real row is still in view. Rows can
    // wrap to different heights, so the stack accumulates each row's measured
    // height rather than assuming a fixed one.
    let countAbove = 0;
    let stackedHeightHeader = headerOffset;
    for (let rowIndex = 0; rowIndex < countRows; rowIndex += 1) {
      const rowActiveLineRect =
        rowsActiveLine[rowIndex].getBoundingClientRect();
      const rowActiveLineBottomOffset =
        rowActiveLineRect.bottom - scrollContainerRect.top;
      if (rowActiveLineBottomOffset > stackedHeightHeader) {
        break;
      }
      countAbove = rowIndex + 1;
      stackedHeightHeader += rowActiveLineRect.height;
    }

    // Mirror of the header: a row is pinned to the footer only once it is fully
    // behind the crumbs already stacked below it (its top edge has cleared
    // their top edge), again accumulating each row's measured height.
    let countBelow = 0;
    let stackedHeightFooter = 0;
    for (let rowIndex = countRows - 1; rowIndex >= 0; rowIndex -= 1) {
      const rowActiveLineRect =
        rowsActiveLine[rowIndex].getBoundingClientRect();
      const rowActiveLineTopOffset =
        rowActiveLineRect.top - scrollContainerRect.top;
      if (
        rowActiveLineTopOffset <
        scrollContainerRect.height - stackedHeightFooter
      ) {
        break;
      }
      countBelow = countRows - rowIndex;
      stackedHeightFooter += rowActiveLineRect.height;
    }

    const visibleAreaTop = scrollContainerRect.top + stackedHeightHeader;
    let isActiveLeafSubtreeInView = false;
    if (countRows > 0 && countRows === activeLine.length) {
      const activeLeafRoot = rowsActiveLine[countRows - 1].closest<HTMLElement>(
        `.${treeItemClasses.root}`,
      );
      if (activeLeafRoot) {
        isActiveLeafSubtreeInView =
          activeLeafRoot.getBoundingClientRect().bottom > visibleAreaTop;
      }
    }

    setStickyBreadcrumbsMetadata((previousStickyBreadcrumbsMetadata) => {
      if (
        previousStickyBreadcrumbsMetadata.countAbove === countAbove &&
        previousStickyBreadcrumbsMetadata.countBelow === countBelow &&
        previousStickyBreadcrumbsMetadata.countRows === countRows &&
        previousStickyBreadcrumbsMetadata.isActiveLeafSubtreeInView ===
          isActiveLeafSubtreeInView
      ) {
        return previousStickyBreadcrumbsMetadata;
      }

      return {
        countAbove,
        countBelow,
        countRows,
        isActiveLeafSubtreeInView,
      };
    });
  }, [scrollContainerRef, headerOffset, activeLine]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      return undefined;
    }

    let animationFrame = 0;
    function requestUpdateStickyBreadcrumbsMetadata(): void {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateStickyBreadcrumbsMetadata);
    }

    requestUpdateStickyBreadcrumbsMetadata();
    scrollContainer.addEventListener(
      'scroll',
      requestUpdateStickyBreadcrumbsMetadata,
      { passive: true },
    );
    const resizeObserver = new ResizeObserver(
      requestUpdateStickyBreadcrumbsMetadata,
    );
    resizeObserver.observe(scrollContainer);
    // Also observe the tree content: expanding/collapsing items animates its
    // height (MUI's group Collapse transition) without resizing the
    // fixed-height scroll container, so the active row slides out of view with
    // no scroll/container-resize to re-measure on. Observing the content keeps
    // measuring throughout the animation, so the crumbs appear as it settles.
    const content = contentRef.current;
    if (content) {
      resizeObserver.observe(content);
    }
    const mutationObserver = new MutationObserver(
      requestUpdateStickyBreadcrumbsMetadata,
    );
    mutationObserver.observe(scrollContainer, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      scrollContainer.removeEventListener(
        'scroll',
        requestUpdateStickyBreadcrumbsMetadata,
      );
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [
    scrollContainerRef,
    contentRef,
    updateStickyBreadcrumbsMetadata,
    activeLine,
  ]);

  const { countAbove, countBelow, countRows, isActiveLeafSubtreeInView } =
    stickyBreadcrumbsMetadata;
  const activeLineHeader = activeLine.slice(0, countAbove);
  const activeLineFooter = activeLine.slice(countRows - countBelow, countRows);

  return {
    activeLineHeader,
    activeLineFooter,
    isActiveLeafSubtreeInView,
  };
}
