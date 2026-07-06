import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import type { WorkspaceSlotName } from '../constants/workspaceSlotNames.constants';
import type { WorkspaceSlotsContextValue } from '../contexts/WorkspaceSlotsContext';
import { WorkspaceSlotsContext } from '../contexts/WorkspaceSlotsContext';
import type { WorkspaceBoxProps } from './WorkspaceBox';
import { WorkspaceBox } from './WorkspaceBox';

export type WorkspaceLayoutProps = Omit<
  WorkspaceBoxProps,
  'workspaceContent'
> & {
  children: React.ReactNode;
};

/**
 * Persistent workspace shell, mounted once for a set of routes. It renders the
 * <WorkspaceBox /> chrome (top app bar, nav drawers, top toolbar) a single time
 * and renders the active route's content (passed as `children`) into its
 * content area, so navigating between modules doesn't remount the NavLeftDrawer
 * (preserving its tree expansion and scroll) nor causes the shell to
 * re-measure and jump.
 *
 * The chrome passed here (e.g. `navTopToolbar`) is persistent. When a
 * <WorkspaceSlotBox /> is embedded anywhere within it to mark the per-route
 * regions, each module fills those by name via <WorkspaceSlotPortal />. So
 * shared chromes (login button, account menu, etc.) stay mounted across
 * navigation while only the
 * per-route bits (title, workspace toolbar) swap.
 * @param props - Component props.
 * @param props.workspaceBoxProps - WorkspaceBoxProps
 * @param props.children - Router-specific content rendered into the shell's
 * content area, kept framework-agnostic: an <Outlet /> under React Router,
 * the layout's own `children` under a Next.js `layout.tsx`.
 * @returns The persistent workspace shell.
 */
export function WorkspaceLayout({
  children,
  ...workspaceBoxProps
}: WorkspaceLayoutProps): React.ReactNode {
  const [slotNodes, setSlotNodes] = useState<
    Partial<Record<WorkspaceSlotName, HTMLElement | null>>
  >({});

  const registerSlotNode = useCallback(
    (slotName: WorkspaceSlotName, node: HTMLElement | null) => {
      setSlotNodes((previousSlotNodes) =>
        previousSlotNodes[slotName] === node
          ? previousSlotNodes
          : { ...previousSlotNodes, [slotName]: node },
      );
    },
    [],
  );

  const workspaceSlotsContextValue: WorkspaceSlotsContextValue = useMemo(
    () => ({ slotNodes, registerSlotNode }),
    [slotNodes, registerSlotNode],
  );

  return (
    <WorkspaceSlotsContext.Provider value={workspaceSlotsContextValue}>
      <WorkspaceBox {...workspaceBoxProps} workspaceContent={children} />
    </WorkspaceSlotsContext.Provider>
  );
}
