import React, { forwardRef, useContext, useMemo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';

type NavRightDrawerProps = {
  navRightDrawerContent?: React.ReactNode;
  navRightDrawerFooter?: React.ReactNode;
};

export const NavRightDrawer = forwardRef<HTMLDivElement, NavRightDrawerProps>(
  ({ navRightDrawerContent, navRightDrawerFooter }, ref) => {
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
        PaperProps={{
          sx: {
            top: navTopToolbarHeight,
            height: `calc(100% - ${navTopToolbarHeight}px)`,
            width: navDrawerWidth,
            overflow: 'visible',
            border: 'none',
            ...NavBoxShadowVerticalSx,
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
  },
);
