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
