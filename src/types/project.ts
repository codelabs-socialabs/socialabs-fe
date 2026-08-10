export enum ProjectLanguage {
  ID = 'ID',
  EN = 'EN',
}

export enum ProjectCategory {
  MARKETING = 'MARKETING',
  EDUCATION = 'EDUCATION',
  HEALTH = 'HEALTH',
  OTHER = 'OTHER',
}

export type ProjectStatus =
  | 'CREATED'
  | 'CRAWLING'
  | 'MODELING'
  | 'COMPLETED'
  | 'FAILED';

export type ProjectStage = 'CRAWLING' | 'MODELING';

export interface ProjectProcessingError {
  stage: string;
  message: string;
}

export interface ProjectProcessing {
  status: ProjectStatus;
  stage?: ProjectStage | null;
  progress: number;
  error?: ProjectProcessingError | null;
  jobId?: string | null;
}

export interface Project {
  id: string;
  _id?: string;
  workspaceId: string;

  name: string;
  description: string;
  category: ProjectCategory;
  keyword: string;

  startDate: string;
  endDate: string;
  language: ProjectLanguage;

  /*
   * Data asli backend.
   */
  processing: ProjectProcessing;

  totalTweets: number;
  crawledTweets: number;
  topicCounte: number;

  createdAt: string;
  updatedAt: string;

  /*
   * Compatibility fields untuk UI lama.
   * Untuk sementara dihasilkan oleh normalizeProject.
   */
  status: ProjectStatus;
  isArchived: boolean;
  dataLimit: number;
  tweetsRetrieved: number;
  topicsCount: number;
}

export interface CreateProjectInput {
  name: string;
  description?: string;
  category: ProjectCategory;
  keyword: string;
  startDate: string;
  endDate: string;
  language: ProjectLanguage;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string;
  category?: ProjectCategory;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  language?: ProjectLanguage;
  isArchived?: boolean;
}

export interface NewProjectForm {
  name: string;
  description: string;
  category: ProjectCategory;
  language: ProjectLanguage;
  keyword: string;
  startDate: string;
  endDate: string;
}

export interface AnalyticsTweetsOverTime {
  date: string;
  count: number;
}

export interface AnalyticsEngagement {
  date: string;
  likes: number;
  retweets: number;
  replies: number;
}

export interface AnalyticsLanguage {
  lang: string;
  count: number;
}

export interface AnalyticsTopUser {
  userId: string;
  count: number;
}

export interface AnalyticsTopKeyword {
  keyword: string;
  count: number;
}

export interface ProjectAnalytics {
  tweetsOverTime: AnalyticsTweetsOverTime[];
  engagement: AnalyticsEngagement[];
  languages: AnalyticsLanguage[];
  topUsers: AnalyticsTopUser[];
  topKeywords: AnalyticsTopKeyword[];
}
