import { TooltipProps } from '@mui/material/Tooltip';
import { useCallback, useContext, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NavContext, NavSideDrawerDisplayStatus } from '../contexts/NavContext';

export type NavDisplayMetadata = {
  collapseNavDrawerCallback: () => void;
  expandNavDrawerCallback: () => void;
  hideNavDrawerCallback: () => void;
  isDesktop: boolean;
  isMobile: boolean;
  isNavDrawerCollapsed: boolean;
  isNavDrawerExpanded: boolean;
  isNavDrawerHidden: boolean;
  isTablet: boolean;
  tooltipDisableListenersProps: Pick<
    TooltipProps,
    | 'disableInteractive'
    | 'disableFocusListener'
    | 'disableHoverListener'
    | 'disableTouchListener'
  >;
};

function useNavDisplayMetadata(): NavDisplayMetadata {
  const { navSideDrawerDisplayStatus, setNavSideDrawerDisplayStatus } =
    useContext(NavContext);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  const isTablet = isSmUp && isMdDown;

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const isNavDrawerExpanded = useMemo(
    () => navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.expanded,
    [navSideDrawerDisplayStatus],
  );

  const isNavDrawerCollapsed = useMemo(
    () => navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.collapsed,
    [navSideDrawerDisplayStatus],
  );

  const isNavDrawerHidden = useMemo(
    () => navSideDrawerDisplayStatus === NavSideDrawerDisplayStatus.hidden,
    [navSideDrawerDisplayStatus],
  );

  const tooltipDisableListenersProps = useMemo(
    () => ({
      disableInteractive: true,
      disableFocusListener: isNavDrawerExpanded,
      disableHoverListener: isNavDrawerExpanded,
      disableTouchListener: isNavDrawerExpanded,
    }),
    [isNavDrawerExpanded],
  );

  const hideNavDrawerCallback = useCallback(() => {
    setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.hidden);
  }, [setNavSideDrawerDisplayStatus]);

  const collapseNavDrawerCallback = useCallback(() => {
    setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.collapsed);
  }, [setNavSideDrawerDisplayStatus]);

  const expandNavDrawerCallback = useCallback(() => {
    setNavSideDrawerDisplayStatus(NavSideDrawerDisplayStatus.expanded);
  }, [setNavSideDrawerDisplayStatus]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isNavDrawerExpanded,
    isNavDrawerCollapsed,
    isNavDrawerHidden,
    hideNavDrawerCallback,
    collapseNavDrawerCallback,
    expandNavDrawerCallback,
    tooltipDisableListenersProps,
  };
}

export default useNavDisplayMetadata;
