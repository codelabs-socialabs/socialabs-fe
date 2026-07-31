import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { workspaceApi } from '@/lib/api/workspace-api';
import { ApiError } from '@/types/api';
import type {
  CreateWorkspaceInput,
  Workspace,
  WorkspacePlan,
} from '@/types/workspace';

export interface UpdateWorkspaceInput {
  name?: string;
  description?: string;
  plan?: WorkspacePlan;
}

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;

  isLoading: boolean;
  isInitialized: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  error: string | null;

  setWorkspaces: (workspaces: Workspace[]) => void;

  setActiveWorkspace: (workspaceId: string | null) => boolean;

  setLoading: (isLoading: boolean) => void;
  setInitialized: (isInitialized: boolean) => void;
  setError: (error: string | null) => void;

  fetchWorkspaces: (force?: boolean) => Promise<Workspace[]>;

  fetchWorkspaceById: (workspaceId: string) => Promise<Workspace | null>;

  createWorkspace: (input: CreateWorkspaceInput) => Promise<Workspace | null>;

  updateWorkspace: (
    workspaceId: string,
    input: UpdateWorkspaceInput,
  ) => Promise<Workspace | null>;

  deleteWorkspace: (workspaceId: string) => Promise<boolean>;

  addWorkspace: (workspace: Workspace) => void;

  replaceWorkspace: (workspace: Workspace) => void;

  removeWorkspaceLocally: (workspaceId: string) => void;

  resetWorkspaceStore: () => void;
}

interface WorkspacePersistedState {
  activeWorkspaceId: string | null;
}

const initialState = {
  workspaces: [] as Workspace[],
  activeWorkspaceId: null as string | null,

  isLoading: false,
  isInitialized: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  error: null as string | null,
};

const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};

const getNextActiveWorkspaceId = (workspaces: Workspace[]): string | null => {
  const personalWorkspace = workspaces.find(
    (workspace) => workspace.isPersonal,
  );

  return personalWorkspace?.id ?? workspaces[0]?.id ?? null;
};

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setWorkspaces: (workspaces: Workspace[]): void => {
        const currentActiveWorkspaceId = get().activeWorkspaceId;

        const activeWorkspaceStillExists =
          currentActiveWorkspaceId !== null &&
          workspaces.some(
            (workspace) => workspace.id === currentActiveWorkspaceId,
          );

        set({
          workspaces,
          activeWorkspaceId: activeWorkspaceStillExists
            ? currentActiveWorkspaceId
            : getNextActiveWorkspaceId(workspaces),
          error: null,
        });
      },

      setActiveWorkspace: (workspaceId: string | null): boolean => {
        if (workspaceId === null) {
          set({
            activeWorkspaceId: null,
          });

          return true;
        }

        const workspaceExists = get().workspaces.some(
          (workspace) => workspace.id === workspaceId,
        );

        if (!workspaceExists) {
          return false;
        }

        set({
          activeWorkspaceId: workspaceId,
        });

        return true;
      },

      setLoading: (isLoading: boolean): void => {
        set({ isLoading });
      },

      setInitialized: (isInitialized: boolean): void => {
        set({ isInitialized });
      },

      setError: (error: string | null): void => {
        set({ error });
      },

      fetchWorkspaces: async (force = false): Promise<Workspace[]> => {
        const { isLoading, isInitialized, workspaces } = get();

        /*
         * Hindari request ganda jika data sudah pernah
         * diambil dan tidak sedang dipaksa refresh.
         */
        if (!force && isInitialized && !isLoading) {
          return workspaces;
        }

        if (isLoading) {
          return workspaces;
        }

        set({
          isLoading: true,
          error: null,
        });

        try {
          const response = await workspaceApi.getWorkspaces();

          /*
           * Gunakan ini jika response backend:
           *
           * {
           *   data: [...]
           * }
           */
          const fetchedWorkspaces = response.data;

          /*
           * Kalau response backend berbentuk:
           *
           * {
           *   data: {
           *     workspaces: [...]
           *   }
           * }
           *
           * ubah baris di atas menjadi:
           *
           * const fetchedWorkspaces =
           *   response.data.workspaces;
           */

          const currentActiveWorkspaceId = get().activeWorkspaceId;

          const activeWorkspaceStillExists =
            currentActiveWorkspaceId !== null &&
            fetchedWorkspaces.some(
              (workspace) => workspace.id === currentActiveWorkspaceId,
            );

          const nextActiveWorkspaceId = activeWorkspaceStillExists
            ? currentActiveWorkspaceId
            : getNextActiveWorkspaceId(fetchedWorkspaces);

          set({
            workspaces: fetchedWorkspaces,
            activeWorkspaceId: nextActiveWorkspaceId,
            isInitialized: true,
            error: null,
          });

          return fetchedWorkspaces;
        } catch (error) {
          const message = getErrorMessage(
            error,
            'Unable to load your workspaces.',
          );

          set({
            workspaces: [],
            activeWorkspaceId: null,
            isInitialized: true,
            error: message,
          });

          return [];
        } finally {
          set({
            isLoading: false,
          });
        }
      },

      fetchWorkspaceById: async (
        workspaceId: string,
      ): Promise<Workspace | null> => {
        const existingWorkspace = get().workspaces.find(
          (workspace) => workspace.id === workspaceId,
        );

        if (existingWorkspace) {
          return existingWorkspace;
        }

        set({
          isLoading: true,
          error: null,
        });

        try {
          const response = await workspaceApi.getWorkspace(workspaceId);

          const workspace = response.data;

          get().addWorkspace(workspace);

          return workspace;
        } catch (error) {
          set({
            error: getErrorMessage(error, 'Unable to load this workspace.'),
          });

          return null;
        } finally {
          set({
            isLoading: false,
          });
        }
      },

      createWorkspace: async (
        input: CreateWorkspaceInput,
      ): Promise<Workspace | null> => {
        if (get().isCreating) {
          return null;
        }

        set({
          isCreating: true,
          error: null,
        });

        try {
          const response = await workspaceApi.createWorkspace(input);

          const createdWorkspace = response.data;

          get().addWorkspace(createdWorkspace);

          return createdWorkspace;
        } catch (error) {
          set({
            error: getErrorMessage(error, 'Unable to create the workspace.'),
          });

          throw error;
        } finally {
          set({
            isCreating: false,
          });
        }
      },

      updateWorkspace: async (
        workspaceId: string,
        input: UpdateWorkspaceInput,
      ): Promise<Workspace | null> => {
        if (get().isUpdating) {
          return null;
        }

        const workspaceExists = get().workspaces.some(
          (workspace) => workspace.id === workspaceId,
        );

        if (!workspaceExists) {
          set({
            error: 'Workspace not found.',
          });

          return null;
        }

        set({
          isUpdating: true,
          error: null,
        });

        try {
          const response = await workspaceApi.updateWorkspace(
            workspaceId,
            input,
          );

          const updatedWorkspace = response.data;

          get().replaceWorkspace(updatedWorkspace);

          return updatedWorkspace;
        } catch (error) {
          set({
            error: getErrorMessage(error, 'Unable to update the workspace.'),
          });

          throw error;
        } finally {
          set({
            isUpdating: false,
          });
        }
      },

      deleteWorkspace: async (workspaceId: string): Promise<boolean> => {
        if (get().isDeleting) {
          return false;
        }

        const workspace = get().workspaces.find(
          (item) => item.id === workspaceId,
        );

        if (!workspace) {
          set({
            error: 'Workspace not found.',
          });

          return false;
        }

        if (workspace.isPersonal) {
          set({
            error: 'Personal workspace cannot be deleted.',
          });

          return false;
        }

        set({
          isDeleting: true,
          error: null,
        });

        try {
          await workspaceApi.deleteWorkspace(workspaceId);

          get().removeWorkspaceLocally(workspaceId);

          return true;
        } catch (error) {
          set({
            error: getErrorMessage(error, 'Unable to delete the workspace.'),
          });

          throw error;
        } finally {
          set({
            isDeleting: false,
          });
        }
      },

      addWorkspace: (workspace: Workspace): void => {
        const workspaceExists = get().workspaces.some(
          (item) => item.id === workspace.id,
        );

        if (workspaceExists) {
          get().replaceWorkspace(workspace);
          return;
        }

        set((state) => ({
          workspaces: [...state.workspaces, workspace],
          activeWorkspaceId: workspace.id,
          error: null,
        }));
      },

      replaceWorkspace: (workspace: Workspace): void => {
        set((state) => {
          const workspaceExists = state.workspaces.some(
            (item) => item.id === workspace.id,
          );

          if (!workspaceExists) {
            return {
              workspaces: [...state.workspaces, workspace],
            };
          }

          return {
            workspaces: state.workspaces.map((item) =>
              item.id === workspace.id ? workspace : item,
            ),
          };
        });
      },

      removeWorkspaceLocally: (workspaceId: string): void => {
        set((state) => {
          const nextWorkspaces = state.workspaces.filter(
            (workspace) => workspace.id !== workspaceId,
          );

          const shouldReplaceActiveWorkspace =
            state.activeWorkspaceId === workspaceId;

          return {
            workspaces: nextWorkspaces,
            activeWorkspaceId: shouldReplaceActiveWorkspace
              ? getNextActiveWorkspaceId(nextWorkspaces)
              : state.activeWorkspaceId,
          };
        });
      },

      resetWorkspaceStore: (): void => {
        set({
          ...initialState,
        });
      },
    }),
    {
      name: 'socialabs-workspace-storage',

      /*
       * Daftar workspace tidak dipersist karena harus selalu
       * mengikuti data terbaru dari backend.
       *
       * Hanya ID workspace terakhir yang disimpan.
       */
      partialize: (state): WorkspacePersistedState => ({
        activeWorkspaceId: state.activeWorkspaceId,
      }),
    },
  ),
);
