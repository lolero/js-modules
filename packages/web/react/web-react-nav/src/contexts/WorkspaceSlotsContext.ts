import { createContext } from 'react';
import type { WorkspaceSlotName } from '../constants/workspaceSlotNames.constants';

export type WorkspaceSlotsContextValue = {
  // The mounted DOM node of each named slot target in the persistent shell,
  // used as the portal container that modules fill via <WorkspaceSlot />.
  slotNodes: Partial<Record<WorkspaceSlotName, HTMLElement | null>>;
  registerSlotNode: (
    slotName: WorkspaceSlotName,
    node: HTMLElement | null,
  ) => void;
};

export const WorkspaceSlotsContext = createContext<WorkspaceSlotsContextValue>({
  slotNodes: {},
  registerSlotNode: () => undefined,
});
