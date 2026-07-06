import entries from 'lodash/entries';
import type React from 'react';
import type { WorkspaceSlotName } from '../constants/workspaceSlotNames.constants';
import { WorkspaceSlotPortal } from './WorkspaceSlotPortal';

export type WorkspaceProps = {
  slots: Partial<Record<WorkspaceSlotName, React.ReactNode>>;
  children: React.ReactNode;
};

/**
 * Module workspace wrapper. It portals each provided slot into its matching
 * <WorkspaceSlotBox /> of the persistent <WorkspaceLayout /> chrome and
 * renders the module's content as `children`.
 * @param props - Component props.
 * @param props.slots - Slot nodes indexed by slot name.
 * @param props.children - The route's workspace content.
 * @returns The portaled slots followed by the route content.
 */
export function Workspace({
  slots,
  children,
}: WorkspaceProps): React.ReactNode {
  return (
    <>
      {entries(slots).map(([slotName, slotContent]) => (
        <WorkspaceSlotPortal
          key={slotName}
          name={slotName as WorkspaceSlotName}
        >
          {slotContent}
        </WorkspaceSlotPortal>
      ))}
      {children}
    </>
  );
}
