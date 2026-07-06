import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import type React from 'react';
import { useCallback, useContext } from 'react';
import type { WorkspaceSlotName } from '../constants/workspaceSlotNames.constants';
import { WorkspaceSlotsContext } from '../contexts/WorkspaceSlotsContext';

export type WorkspaceSlotBoxProps = {
  name: WorkspaceSlotName;
  sx?: BoxProps['sx'];
};

/**
 * Marks a spot in a <WorkspaceLayout />'s persistent chrome which modules fill
 * by name via <WorkspaceSlotPortal />. It renders an empty box and
 * registers its mounted DOM node as the portal container for that slot name.
 * @param props - Component props.
 * @param props.name - Slot name.
 * @param props.sx - Optional styling for the slot target box.
 * @returns The slot target box.
 */
export function WorkspaceSlotBox({
  name,
  sx,
}: WorkspaceSlotBoxProps): React.ReactNode {
  const { registerSlotNode } = useContext(WorkspaceSlotsContext);

  const setSlotNode = useCallback(
    (node: HTMLElement | null) => {
      registerSlotNode(name, node);
    },
    [registerSlotNode, name],
  );

  return <Box ref={setSlotNode} sx={sx} />;
}
