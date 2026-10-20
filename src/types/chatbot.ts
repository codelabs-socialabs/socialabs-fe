export type ChatProcessingType = 'full' | 'crag' | 'fallacy' | 'simple';

export interface ChatMessageSource {
  title: string;
  url?: string;
  source?: 'project_dataset' | 'web';
}

export interface FallacyAnalysisResult {
  fallacyType: string | null;
  confidence: number;
  explanation?: string;
  suggestedModification?: string;
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  processingType?: ChatProcessingType;
  sources?: ChatMessageSource[];
  fallacy?: FallacyAnalysisResult;
  createdAt: string;
}

export interface ConversationSession {
  id: string;
  projectId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}
