import { TooltipProps } from '@mui/material/Tooltip';
import { useCallback, useContext, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';

type DrawerTooltipDisableListenersProps = Pick<
  TooltipProps,
  | 'disableInteractive'
  | 'disableFocusListener'
  | 'disableHoverListener'
  | 'disableTouchListener'
>;

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
  isNavRightDrawerHidden: boolean;
  isNavRightDrawerCollapsed: boolean;
  isNavRightDrawerExpanded: boolean;
  hideNavRightDrawerCallback: () => void;
  collapseNavRightDrawerCallback: () => void;
  expandNavRightDrawerCallback: () => void;
  navLeftDrawerTooltipDisableListenersProps: DrawerTooltipDisableListenersProps;
  navRightDrawerTooltipDisableListenersProps: DrawerTooltipDisableListenersProps;
};

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

  const isNavLeftDrawerExpanded = useMemo(
    () => navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.expanded,
    [navLeftDrawerDisplayStatus],
  );

  const isNavLeftDrawerCollapsed = useMemo(
    () => navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed,
    [navLeftDrawerDisplayStatus],
  );

  const isNavLeftDrawerHidden = useMemo(
    () => navLeftDrawerDisplayStatus === NavDrawerDisplayStatus.hidden,
    [navLeftDrawerDisplayStatus],
  );

  const isNavRightDrawerExpanded = useMemo(
    () => navRightDrawerDisplayStatus === NavDrawerDisplayStatus.expanded,
    [navRightDrawerDisplayStatus],
  );

  const isNavRightDrawerCollapsed = useMemo(
    () => navRightDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed,
    [navRightDrawerDisplayStatus],
  );

  const isNavRightDrawerHidden = useMemo(
    () => navRightDrawerDisplayStatus === NavDrawerDisplayStatus.hidden,
    [navRightDrawerDisplayStatus],
  );

  const navLeftDrawerTooltipDisableListenersProps = useMemo(
    () => ({
      disableInteractive: true,
      disableFocusListener: isNavLeftDrawerExpanded,
      disableHoverListener: isNavLeftDrawerExpanded,
      disableTouchListener: isNavLeftDrawerExpanded,
    }),
    [isNavLeftDrawerExpanded],
  );

  const navRightDrawerTooltipDisableListenersProps = useMemo(
    () => ({
      disableInteractive: true,
      disableFocusListener: isNavRightDrawerExpanded,
      disableHoverListener: isNavRightDrawerExpanded,
      disableTouchListener: isNavRightDrawerExpanded,
    }),
    [isNavRightDrawerExpanded],
  );

  const hideNavLeftDrawerCallback = useCallback(() => {
    setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
  }, [setNavLeftDrawerDisplayStatus]);

  const collapseNavLeftDrawerCallback = useCallback(() => {
    setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
  }, [setNavLeftDrawerDisplayStatus]);

  const expandNavLeftDrawerCallback = useCallback(() => {
    setNavLeftDrawerDisplayStatus(NavDrawerDisplayStatus.expanded);
  }, [setNavLeftDrawerDisplayStatus]);

  const hideNavRightDrawerCallback = useCallback(() => {
    setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.hidden);
  }, [setNavRightDrawerDisplayStatus]);

  const collapseNavRightDrawerCallback = useCallback(() => {
    setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.collapsed);
  }, [setNavRightDrawerDisplayStatus]);

  const expandNavRightDrawerCallback = useCallback(() => {
    setNavRightDrawerDisplayStatus(NavDrawerDisplayStatus.expanded);
  }, [setNavRightDrawerDisplayStatus]);

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
    isNavRightDrawerHidden,
    isNavRightDrawerCollapsed,
    isNavRightDrawerExpanded,
    hideNavRightDrawerCallback,
    collapseNavRightDrawerCallback,
    expandNavRightDrawerCallback,
    navLeftDrawerTooltipDisableListenersProps,
    navRightDrawerTooltipDisableListenersProps,
  };
}
