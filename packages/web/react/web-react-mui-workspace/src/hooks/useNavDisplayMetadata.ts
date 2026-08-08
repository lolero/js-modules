import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';

export type NavDisplayMetadata = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isNavLeftDrawerHidden: boolean;
  isNavLeftDrawerCollapsed: boolean;
  isNavLeftDrawerExpanded: boolean;
  hideNavLeftDrawerCallback: () => void;
  collapseNavLeftDrawerCallback: () => void;
  expandNavLeftDrawerCallback: () => void;
  closeNavLeftDrawerCallback: () => void;
  isNavRightDrawerHidden: boolean;
  isNavRightDrawerCollapsed: boolean;
  isNavRightDrawerExpanded: boolean;
  hideNavRightDrawerCallback: () => void;
  collapseNavRightDrawerCallback: () => void;
  expandNavRightDrawerCallback: () => void;
  closeNavRightDrawerCallback: () => void;
};

/**
 * React hook deriving the responsive display state of both nav drawers from the
 * current breakpoint and NavContext, plus the callbacks to hide/collapse/expand
 * them.
 * @returns The NavDisplayMetadata with drawer display callbacks.
 */
export function useNavDisplayMetadata(): NavDisplayMetadata {
  const {
    navLeftDrawerDisplayStatus,
    setNavLeftDrawerDisplayStatus,
    navRightDrawerDisplayStatus,
    setNavRightDrawerDisplayStatus,
  } = useContext(NavContext);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const isTablet = isSmUp && isMdDown;

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const isNavLeftDrawerExpanded =
    navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.expanded;

  const isNavLeftDrawerCollapsed =
    navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed;

  const isNavLeftDrawerHidden =
    navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.hidden;

  const isNavRightDrawerExpanded =
    navRightDrawerDisplayStatus === NavDrawerDisplayStatus.expanded;

  const isNavRightDrawerCollapsed =
    navRightDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed;

  const isNavRightDrawerHidden =
    navRightDrawerDisplayStatus === NavDrawerDisplayStatus.hidden;

  function hideNavLeftDrawerCallback(): void {
    setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
  }

  function collapseNavLeftDrawerCallback(): void {
    setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
  }

  function expandNavLeftDrawerCallback(): void {
    setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.expanded);
  }

  function closeNavLeftDrawerCallback(): void {
    if (isNavLeftDrawerExpanded) {
      if (isMobile) {
        setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
      } else if (isTablet) {
        setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
      }
    }
  }

  function hideNavRightDrawerCallback(): void {
    setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
  }

  function collapseNavRightDrawerCallback(): void {
    setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
  }

  function expandNavRightDrawerCallback(): void {
    setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.expanded);
  }

  function closeNavRightDrawerCallback(): void {
    if (isNavRightDrawerExpanded) {
      if (isMobile) {
        setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
      } else if (isTablet) {
        setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
      }
    }
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isNavLeftDrawerHidden,
    isNavLeftDrawerCollapsed,
    isNavLeftDrawerExpanded,
    hideNavLeftDrawerCallback,
    collapseNavLeftDrawerCallback,
    expandNavLeftDrawerCallback,
    closeNavLeftDrawerCallback,
    isNavRightDrawerHidden,
    isNavRightDrawerCollapsed,
    isNavRightDrawerExpanded,
    hideNavRightDrawerCallback,
    collapseNavRightDrawerCallback,
    expandNavRightDrawerCallback,
    closeNavRightDrawerCallback,
  };
}
