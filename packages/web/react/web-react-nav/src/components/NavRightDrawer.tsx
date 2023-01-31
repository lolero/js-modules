import React, { forwardRef, useContext, useMemo } from 'react';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useTheme, Theme } from '@mui/material/styles';
import { NavBoxShadowVerticalSx } from '../styles/navStyles';
import { WorkspaceContext } from '../contexts/WorkspaceContext';
import { useNavDisplayMetadata } from '../hooks/useNavDisplayMetadata';
import { NavContext, NavDrawerDisplayStatus } from '../contexts/NavContext';

const dividerSx = {
  mx: (t: Theme) => t.spacing(0.5),
} as const;

type NavRightDrawerProps = {
  navRightDrawerContent?: React.ReactNode;
  navRightDrawerFooter?: React.ReactNode;
};

export const NavRightDrawer = forwardRef<HTMLDivElement, NavLeftDrawerProps>(
  ({ navLeftDrawerContent, navLeftDrawerFooter }, ref) => {
    return <div>right drawer</div>;
  },
);
