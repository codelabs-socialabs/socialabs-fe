import { apiClient } from '@/lib/api/api-client';
import { tokenStorage } from '@/lib/auth/token-storage';
import { env } from '@/config/env';
import type {
  CreateProjectInput,
  Project,
  ProjectAnalytics,
  Topic,
  TopicDocument,
  TweetListResult,
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

interface TweetListResponse {
  message: string;
  status: boolean;
  data: TweetListResult;
}

interface TopicListResponse {
  message: string;
  status: boolean;
  data: Topic[];
}

interface TopicDocumentsResponse {
  message: string;
  status: boolean;
  data: TopicDocument[];
}

interface ProcessTopicsResponse {
  message: string;
  status: boolean;
  data: boolean;
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

  getProjectTweets: async (
    workspaceId: string,
    projectId: string,
    page = 1,
    limit = 25,
  ): Promise<TweetListResponse> => {
    return apiClient<TweetListResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/tweets?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        requireAuth: true,
      },
    );
  },

  getProjectTopics: async (
    workspaceId: string,
    projectId: string,
  ): Promise<TopicListResponse> => {
    return apiClient<TopicListResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/topics`,
      {
        method: 'GET',
        requireAuth: true,
      },
    );
  },

  getTopicDocuments: async (
    workspaceId: string,
    projectId: string,
    topicId?: number,
  ): Promise<TopicDocumentsResponse> => {
    const url = topicId
      ? `/workspaces/${workspaceId}/projects/${projectId}/topics/documents?topicId=${topicId}`
      : `/workspaces/${workspaceId}/projects/${projectId}/topics/documents`;
    return apiClient<TopicDocumentsResponse>(url, {
      method: 'GET',
      requireAuth: true,
    });
  },

  processTopics: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProcessTopicsResponse> => {
    return apiClient<ProcessTopicsResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/topics/process`,
      {
        method: 'POST',
        requireAuth: true,
      },
    );
  },

  getProgressStreamUrl: (workspaceId: string, projectId: string): string => {
    const token = tokenStorage.getAccessToken();
    return `${env.apiBaseUrl}/workspaces/${workspaceId}/projects/${projectId}/progress/stream?token=${token}`;
  },
};
