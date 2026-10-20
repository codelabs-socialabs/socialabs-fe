import { apiClient } from '@/lib/api/api-client';
import { tokenStorage } from '@/lib/auth/token-storage';
import { env } from '@/config/env';
import type { ChatMessageItem, ConversationSession } from '@/types/chatbot';
import type {
  CreateProjectInput,
  EmotionResult,
  Project,
  ProjectAnalytics,
  SentimentResult,
  Topic,
  TopicDocument,
  TweetListResult,
  UpdateProjectInput,
  WordFrequency,
  SNACommunityResult,
  InfluencerBuzzer,
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

interface SentimentResponse {
  message: string;
  status: boolean;
  data: SentimentResult;
}

interface WordFrequencyResponse {
  message: string;
  status: boolean;
  data: WordFrequency;
}

interface EmotionResponse {
  message: string;
  status: boolean;
  data: EmotionResult;
}

interface SNACommunitiesResponse {
  message: string;
  status: boolean;
  data: SNACommunityResult;
}

interface SNAInfluencersResponse {
  message: string;
  status: boolean;
  data: InfluencerBuzzer[];
}

interface ProcessAnalysisResponse {
  message: string;
  status: boolean;
  data: boolean;
}

interface ConversationListResponse {
  message: string;
  status: boolean;
  data: ConversationSession[];
}

interface ConversationDetailResponse {
  message: string;
  status: boolean;
  data: {
    id: string;
    projectId: string;
    title: string;
    messages: ChatMessageItem[];
    createdAt: string;
    updatedAt: string;
  };
}

interface DeleteConversationResponse {
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

  getProjectSentiments: async (
    workspaceId: string,
    projectId: string,
  ): Promise<SentimentResponse> => {
    return apiClient<SentimentResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/sentiments`,
      { method: 'GET', requireAuth: true },
    );
  },

  getWordFrequency: async (
    workspaceId: string,
    projectId: string,
  ): Promise<WordFrequencyResponse> => {
    return apiClient<WordFrequencyResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/sentiments/word-frequency`,
      { method: 'GET', requireAuth: true },
    );
  },

  processSentiments: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProcessAnalysisResponse> => {
    return apiClient<ProcessAnalysisResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/sentiments/process`,
      { method: 'POST', requireAuth: true },
    );
  },

  getProjectEmotions: async (
    workspaceId: string,
    projectId: string,
  ): Promise<EmotionResponse> => {
    return apiClient<EmotionResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/emotions`,
      { method: 'GET', requireAuth: true },
    );
  },

  processEmotions: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProcessAnalysisResponse> => {
    return apiClient<ProcessAnalysisResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/emotions/process`,
      { method: 'POST', requireAuth: true },
    );
  },

  getProjectCommunities: async (
    workspaceId: string,
    projectId: string,
  ): Promise<SNACommunitiesResponse> => {
    return apiClient<SNACommunitiesResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/sna/communities`,
      { method: 'GET', requireAuth: true },
    );
  },

  getProjectInfluencers: async (
    workspaceId: string,
    projectId: string,
  ): Promise<SNAInfluencersResponse> => {
    return apiClient<SNAInfluencersResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/sna/influencers`,
      { method: 'GET', requireAuth: true },
    );
  },

  processSNA: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ProcessAnalysisResponse> => {
    return apiClient<ProcessAnalysisResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/sna/process`,
      { method: 'POST', requireAuth: true },
    );
  },

  getProgressStreamUrl: (workspaceId: string, projectId: string): string => {
    const token = tokenStorage.getAccessToken();
    return `${env.apiBaseUrl}/workspaces/${workspaceId}/projects/${projectId}/progress/stream?token=${token}`;
  },

  getConversations: async (
    workspaceId: string,
    projectId: string,
  ): Promise<ConversationListResponse> => {
    return apiClient<ConversationListResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/chatbot/conversations`,
      { method: 'GET', requireAuth: true },
    );
  },

  getConversation: async (
    workspaceId: string,
    projectId: string,
    conversationId: string,
  ): Promise<ConversationDetailResponse> => {
    return apiClient<ConversationDetailResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/chatbot/conversations/${conversationId}`,
      { method: 'GET', requireAuth: true },
    );
  },

  deleteConversation: async (
    workspaceId: string,
    projectId: string,
    conversationId: string,
  ): Promise<DeleteConversationResponse> => {
    return apiClient<DeleteConversationResponse>(
      `/workspaces/${workspaceId}/projects/${projectId}/chatbot/conversations/${conversationId}`,
      { method: 'DELETE', requireAuth: true },
    );
  },

  getChatStreamUrl: (workspaceId: string, projectId: string): string => {
    const token = tokenStorage.getAccessToken();
    return `${env.apiBaseUrl}/workspaces/${workspaceId}/projects/${projectId}/chatbot/chat/stream?token=${token}`;
  },
};
