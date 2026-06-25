import { apiClient } from '@/lib/api-client';
import type {
  Workspace,
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
  ApiResponse,
} from './types';

export const workspaceService = {
  async getList(): Promise<Workspace[]> {
    const res = await apiClient.get<ApiResponse<Workspace[]>>('/workspaces');
    return res.data.data;
  },

  async getDetail(id: string): Promise<Workspace> {
    const res = await apiClient.get<ApiResponse<Workspace>>(
      `/workspaces/${id}`,
    );
    return res.data.data;
  },

  async create(data: CreateWorkspaceRequest): Promise<Workspace> {
    const res = await apiClient.post<ApiResponse<Workspace>>(
      '/workspaces',
      data,
    );
    return res.data.data;
  },

  async update(id: string, data: UpdateWorkspaceRequest): Promise<Workspace> {
    const res = await apiClient.patch<ApiResponse<Workspace>>(
      `/workspaces/${id}`,
      data,
    );
    return res.data.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/workspaces/${id}`);
  },
};
