import { apiClient } from '@/lib/api/api-client';
import { tokenStorage } from '@/lib/auth/token-storage';
import { env } from '@/config/env';
import type {
  CreateProjectInput,
  Project,
  ProjectAnalytics,
  UpdateProjectInput,
} from '@/types/project';

interface ProjectListResponse {
  message: string;
  status: boolean;
  data: Project[];
}

interface ProjectDetailResponse {
  message: string;
  status: boolean;
  data: Project;
}

interface DeleteProjectResponse {
  message: string;
  status: boolean;
  data?: null;
}

interface RecrawlResponse {
  message: string;
  status: boolean;
  data: boolean;
}

interface AnalyticsResponse {
  message: string;
  status: boolean;
  data: ProjectAnalytics;
}

export const projectApi = {
  getProjects: async (workspaceId: string): Promise<ProjectListResponse> => {
    return apiClient<ProjectListResponse>(
      `/workspaces/${workspaceId}/projects`,
      {
        method: 'GET',
        requireAuth: true,
      },
    );
  },

  getProject: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProjectDetailResponse> => {
    return apiClient<ProjectDetailResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}`,
      {
        method: 'GET',
        requireAuth: true,
      },
    );
  },

  createProject: async (
    workspaceId: string,
    input: CreateProjectInput,
  ): Promise<ProjectDetailResponse> => {
    return apiClient<ProjectDetailResponse>(
      `/workspaces/${workspaceId}/projects`,
      {
        method: 'POST',
        requireAuth: true,
        body: JSON.stringify(input),
      },
    );
  },

  updateProject: async (
    workspaceId: string,
    projectId: string,
    input: UpdateProjectInput,
  ): Promise<ProjectDetailResponse> => {
    return apiClient<ProjectDetailResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}`,
      {
        method: 'PATCH',
        requireAuth: true,
        body: JSON.stringify(input),
      },
    );
  },

  deleteProject: async (
    workspaceId: string,
    projectId: string,
  ): Promise<DeleteProjectResponse> => {
    return apiClient<DeleteProjectResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}`,
      {
        method: 'DELETE',
        requireAuth: true,
      },
    );
  },

  recrawlProject: async (
    workspaceId: string,
    projectId: string,
  ): Promise<RecrawlResponse> => {
    return apiClient<RecrawlResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/recrawl`,
      {
        method: 'POST',
        requireAuth: true,
      },
    );
  },

  getProjectAnalytics: async (
    workspaceId: string,
    projectId: string,
  ): Promise<AnalyticsResponse> => {
    return apiClient<AnalyticsResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/analytics`,
      {
        method: 'GET',
        requireAuth: true,
      },
    );
  },

  getProgressStreamUrl: (workspaceId: string, projectId: string): string => {
    const token = tokenStorage.getAccessToken();
    return `${env.apiBaseUrl}/workspaces/${workspaceId}/projects/${projectId}/progress/stream?token=${token}`;
  },
};
