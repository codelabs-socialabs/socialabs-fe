export type ProjectCategory = 'MARKETING' | 'EDUCATION' | 'HEALTH' | 'OTHER';
export type ProjectLanguage = 'ID' | 'EN';
export type ProjectStatus =
  | 'CREATED'
  | 'CRAWLING'
  | 'MODELING'
  | 'COMPLETED'
  | 'FAILED';

export interface ProjectProcessing {
  status: ProjectStatus;
  stage?: 'CRAWLING' | 'MODELING' | null;
  progress: number;
  error?: { stage: string; message: string } | null;
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  category: ProjectCategory;
  keyword: string;
  startDate: string;
  endDate: string;
  language: ProjectLanguage;
  workspaceId: string;
  processing: ProjectProcessing;
  totalTweets: number;
  crawledTweets: number;
  createdAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  category: ProjectCategory;
  keyword: string;
  startDate: string;
  endDate: string;
  language: ProjectLanguage;
}

export interface ApiResponse<T> {
  message: string;
  status: boolean;
  data: T;
}

export interface TweetOverTime {
  date: string;
  count: number;
}

export interface EngagementData {
  date: string;
  likes: number;
  retweets: number;
  replies: number;
}

export interface LanguageData {
  lang: string;
  count: number;
}

export interface KeywordData {
  keyword: string;
  count: number;
}

export interface UserData {
  userId: string;
  count: number;
}

export interface ProjectAnalytics {
  tweetsOverTime: TweetOverTime[];
  engagement: EngagementData[];
  languages: LanguageData[];
  topUsers: UserData[];
  topKeywords: KeywordData[];
}
