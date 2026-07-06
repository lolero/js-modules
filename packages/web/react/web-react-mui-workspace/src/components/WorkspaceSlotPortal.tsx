import isNull from 'lodash/isNull';
import type React from 'react';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import type { WorkspaceSlotName } from '../constants/workspaceSlotNames.constants';
import { WorkspaceSlotsContext } from '../contexts/WorkspaceSlotsContext';

export type WorkspaceSlotPortalProps = {
  name: WorkspaceSlotName;
  children: React.ReactNode;
};

/**
 * Fills a named slot of the persistent <WorkspaceLayout /> chrome from within a
 * module. The content is portaled into the matching <WorkspaceSlotBox />'s node,
 * so the module declares its chrome locally while it actually renders into
 * the persistent shell — without funneling the module's render output
 * through the shell's state (which would loop or go stale).
 * @param props - Component props.
 * @param props.name - Target slot name.
 * @param props.children - Module content to portal into slot.
 * @returns The portaled content, or null until the slot target mounts.
 */
export function WorkspaceSlotPortal({
  name,
  children,
}: WorkspaceSlotPortalProps): React.ReactNode {
  const { slotNodes } = useContext(WorkspaceSlotsContext);
  const slotNode = slotNodes[name] ?? null;

  if (isNull(slotNode)) {
    return null;
  }

  return createPortal(children, slotNode);
}
