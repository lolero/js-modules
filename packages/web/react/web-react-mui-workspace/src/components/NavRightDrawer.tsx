import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import type { DrawerProps } from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import type React from 'react';
import { useContext, useMemo } from 'react';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';

type NavRightDrawerProps = {
  ref?: React.Ref<HTMLDivElement>;
  navRightDrawerContent?: React.ReactNode;
  navRightDrawerFooter?: React.ReactNode;
};

/**
 * Right navigation drawer, sized and shown per the current display status.
 * @param props - Component props.
 * @param props.ref - Ref to the underlying drawer element.
 * @param props.navRightDrawerContent - Scrollable body of the drawer.
 * @param props.navRightDrawerFooter - Content pinned below the drawer body.
 * @returns The right drawer element.
 */
export function NavRightDrawer({
  ref,
  navRightDrawerContent,
  navRightDrawerFooter,
}: NavRightDrawerProps) {
  const {
    navRightDrawerDisplayStatus,
    navRightDrawerCollapsedWidth,
    navRightDrawerExpandedWidth,
  } = useContext(NavContext);

  const { navTopToolbarHeight } = useContext(WorkspaceContext);

  const { isMobile, isTablet, closeNavRightDrawerCallback } =
    useNavDisplayMetadata();

  const navDrawerWidth = useMemo(() => {
    if (navRightDrawerDisplayStatus === NavDrawerDisplayStatus.collapsed) {
      return navRightDrawerCollapsedWidth;
    }

    if (
      isMobile &&
      navRightDrawerDisplayStatus === NavDrawerDisplayStatus.expanded
    ) {
      return '100%';
    }

    return navRightDrawerExpandedWidth;
  }, [
    isMobile,
    navRightDrawerDisplayStatus,
    navRightDrawerCollapsedWidth,
    navRightDrawerExpandedWidth,
  ]);

  const drawerVariant: DrawerProps['variant'] = useMemo(() => {
    if (
      isMobile ||
      (isTablet &&
        navRightDrawerDisplayStatus === NavDrawerDisplayStatus.expanded)
    ) {
      return 'temporary';
    }

    return 'permanent';
  }, [isMobile, isTablet, navRightDrawerDisplayStatus]);

  return (
    <Drawer
      ref={ref}
      sx={{
        width: navDrawerWidth,
      }}
      variant={drawerVariant}
      anchor={isMobile ? 'left' : 'right'}
      open={navRightDrawerDisplayStatus !== NavDrawerDisplayStatus.hidden}
      slotProps={{
        paper: {
          sx: {
            top: navTopToolbarHeight,
            height: `calc(100% - ${navTopToolbarHeight}px)`,
            width: navDrawerWidth,
            overflow: 'visible',
            border: 'none',
            ...NavBoxShadowVerticalSx,
          },
        },
      }}
      onClose={closeNavRightDrawerCallback}
    >
      <Divider sx={{ mx: 0.5 }} />
      {navRightDrawerDisplayStatus === NavDrawerDisplayStatus.expanded && (
        <>
          <Box
            sx={{
              flexGrow: 1,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {navRightDrawerContent}
          </Box>
          <Box>{navRightDrawerFooter}</Box>
        </>
      )}
    </Drawer>
  );
}
