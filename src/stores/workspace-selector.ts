import type { Workspace } from '@/types/workspace';

interface WorkspaceStoreSnapshot {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
}

export const selectActiveWorkspace = (
  state: WorkspaceStoreSnapshot,
): Workspace | undefined => {
  return state.workspaces.find(
    (workspace) => workspace.id === state.activeWorkspaceId,
  );
};

export const selectPersonalWorkspace = (
  state: WorkspaceStoreSnapshot,
): Workspace | undefined => {
  return state.workspaces.find((workspace) => workspace.isPersonal);
};
