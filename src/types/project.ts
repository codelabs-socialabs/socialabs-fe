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

export interface Tweet {
  id: string;
  tweetId: string;
  fullText: string;
  createdAtTwitter: string | null;
  quoteCount: number;
  replyCount: number;
  retweetCount: number;
  favoriteCount: number;
  lang: string;
  userIdStr: string;
  conversationIdStr: string;
  tweetUrl: string;
  imageUrl: string | null;
  location: string | null;
}

export interface TweetListResult {
  tweets: Tweet[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface Topic {
  id: string;
  topicId: number;
  projectId: string;
  keyword: string;
  words: string[];
  context: string;
  documentCount?: number;
}

export interface TopicDocument {
  id: string;
  projectId: string;
  fullText: string;
  rawText: string;
  username: string;
  tweetUrl: string;
  topic: number;
  probability: number;
}

export interface SentimentPercentage {
  positive: number;
  negative: number;
}

export interface SentimentDocument {
  id: string;
  projectId: string;
  rawText: string;
  preprocessedText: string;
  topic: number | null;
  sentimentCnn: string;
  sentimentCnnProbability: number;
  sentimentCnnLstm: string;
  sentimentCnnLstmProbability: number;
}

export interface SentimentResult {
  total: number;
  documents: SentimentDocument[];
  sentimentPercentageCnn: SentimentPercentage;
  sentimentPercentageCnnLstm: SentimentPercentage;
  sentimentByTopicCnn: Record<string, SentimentPercentage & { total: number }>;
  sentimentByTopicCnnLstm: Record<
    string,
    SentimentPercentage & { total: number }
  >;
}

export interface WordFrequencyItem {
  word: string;
  count: number;
}

export interface WordFrequency {
  positive: WordFrequencyItem[];
  negative: WordFrequencyItem[];
}

export interface EmotionPercentage {
  Anger: number;
  Fear: number;
  Joy: number;
  Love: number;
  Sad: number;
  Neutral: number;
}

export interface EmotionDocument {
  id: string;
  projectId: string;
  rawText: string;
  preprocessedText: string;
  topic: number | null;
  emotionCnn: string;
  emotionCnnProbability: Record<string, number>;
  emotionBilstm: string;
  emotionBilstmProbability: Record<string, number>;
}

export interface EmotionResult {
  total: number;
  documents: EmotionDocument[];
  emotionPercentageCnn: EmotionPercentage;
  emotionPercentageBilstm: EmotionPercentage;
  emotionByTopicCnn: Record<string, EmotionPercentage>;
  emotionByTopicBilstm: Record<string, EmotionPercentage>;
}

export interface SNACommunityNode {
  id: string;
  name: string;
  community: number;
  val?: number;
  color?: string;
}

export interface SNACommunityEdge {
  source: string;
  target: string;
  weight?: number;
  source_community?: number;
  target_community?: number;
  sourceCommunity?: number;
  targetCommunity?: number;
  fullText?: string;
  topic?: string;
  tweetUrl?: string;
}

export interface SNACommunityResult {
  totalCommunities: number;
  totalNodes: number;
  totalEdges: number;
  nodes: SNACommunityNode[];
  edges: SNACommunityEdge[];
}

export type InfluencerRole = 'Originator' | 'Amplifier' | 'Engager' | 'Bridge';

export interface InfluencerBuzzer {
  id: string;
  username: string;
  influenceScore: number;
  role: InfluencerRole;
  betweennessCentrality: number;
  eigenvectorCentrality: number;
  finalMeasure: number;
  rank: number;
  tweetUrl?: string;
  followers?: number;
  engagementRate?: number;
  dominantTopic?: string;
}

export interface InfluencerResult {
  total: number;
  influencers: InfluencerBuzzer[];
}
