export const WorkspaceSlotName = {
  title: 'title',
  workspaceTopToolbar: 'workspaceTopToolbar',
} as const;
export type WorkspaceSlotName =
  (typeof WorkspaceSlotName)[keyof typeof WorkspaceSlotName];
