import { apiClient } from '@/lib/api/api-client';
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

interface WorkspaceListResponse {
  message: string;
  status: boolean;
  data: Workspace[];
}

interface WorkspaceDetailResponse {
  message: string;
  status: boolean;
  data: Workspace;
}

interface DeleteWorkspaceResponse {
  message: string;
  status: boolean;
}

export const workspaceApi = {
  getWorkspaces: async (): Promise<WorkspaceListResponse> => {
    return apiClient<WorkspaceListResponse>('/workspaces', {
      method: 'GET',
      requireAuth: true,
    });
  },

  getWorkspace: async (
    workspaceId: string,
  ): Promise<WorkspaceDetailResponse> => {
    return apiClient<WorkspaceDetailResponse>(`/workspaces/${workspaceId}`, {
      method: 'GET',
      requireAuth: true,
    });
  },

  createWorkspace: async (
    input: CreateWorkspaceInput,
  ): Promise<WorkspaceDetailResponse> => {
    return apiClient<WorkspaceDetailResponse>('/workspaces', {
      method: 'POST',
      requireAuth: true,
      body: JSON.stringify(input),
    });
  },

  updateWorkspace: async (
    workspaceId: string,
    input: UpdateWorkspaceInput,
  ): Promise<WorkspaceDetailResponse> => {
    return apiClient<WorkspaceDetailResponse>(`/workspaces/${workspaceId}`, {
      method: 'PATCH',
      requireAuth: true,
      body: JSON.stringify(input),
    });
  },

  deleteWorkspace: async (
    workspaceId: string,
  ): Promise<DeleteWorkspaceResponse> => {
    return apiClient<DeleteWorkspaceResponse>(`/workspaces/${workspaceId}`, {
      method: 'DELETE',
      requireAuth: true,
    });
  },
};
