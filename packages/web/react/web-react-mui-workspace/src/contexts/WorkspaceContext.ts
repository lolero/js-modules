import { createContext } from 'react';
import type { Enum } from '@js-modules/common-utils-general';

export const ScrollDirection = {
  down: 'down',
  up: 'up',
} as const;
export type ScrollDirection = Enum<typeof ScrollDirection>;

export type WorkspaceContextValue = {
  navTopToolbarHeight: number;
  navLeftDrawerWidth: number;
  navRightDrawerWidth: number;
  workspaceTopToolbarHeight: number;
  workspaceMarginLeft: string | number;
  workspaceMarginRight: string | number;
  isWorkspaceScroll: boolean;
  workspaceScrollTop: number;
  workspaceScrollDirection?: ScrollDirection;
};

export const WorkspaceContext = createContext<WorkspaceContextValue>({
  navTopToolbarHeight: 0,
  navLeftDrawerWidth: 0,
  navRightDrawerWidth: 0,
  workspaceTopToolbarHeight: 0,
  workspaceMarginLeft: '0',
  workspaceMarginRight: '0',
  isWorkspaceScroll: false,
  workspaceScrollTop: 0,
});
