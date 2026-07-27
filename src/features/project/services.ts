import { apiClient } from '@/lib/api-client';
import type {
  Project,
  CreateProjectRequest,
  ApiResponse,
  ProjectAnalytics,
} from './types';

export const projectService = {
  async getList(workspaceId: string): Promise<Project[]> {
    const res = await apiClient.get<ApiResponse<Project[]>>(
      `/workspaces/${workspaceId}/projects`,
    );
    return res.data.data;
  },

  async getDetail(workspaceId: string, projectId: string): Promise<Project> {
    const res = await apiClient.get<ApiResponse<Project>>(
      `/workspaces/${workspaceId}/projects/${projectId}`,
    );
    return res.data.data;
  },

  async create(
    workspaceId: string,
    data: CreateProjectRequest,
  ): Promise<Project> {
    const res = await apiClient.post<ApiResponse<Project>>(
      `/workspaces/${workspaceId}/projects`,
      data,
    );
    return res.data.data;
  },

  async delete(workspaceId: string, projectId: string): Promise<void> {
    await apiClient.delete(`/workspaces/${workspaceId}/projects/${projectId}`);
  },

  async recrawl(workspaceId: string, projectId: string): Promise<void> {
    await apiClient.post(
      `/workspaces/${workspaceId}/projects/${projectId}/recrawl`,
    );
  },

  async getAnalytics(
    workspaceId: string,
    projectId: string,
  ): Promise<ProjectAnalytics> {
    const res = await apiClient.get<ApiResponse<ProjectAnalytics>>(
      `/workspaces/${workspaceId}/projects/${projectId}/analytics`,
    );
    return res.data.data;
  },
};
