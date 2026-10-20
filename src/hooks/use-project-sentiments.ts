import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { SentimentResult } from '@/types/project';

interface UseProjectSentimentsResult {
  sentimentResult: SentimentResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectSentiments = (
  workspaceId: string,
  projectId: string,
): UseProjectSentimentsResult => {
  const [sentimentResult, setSentimentResult] =
    useState<SentimentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!workspaceId || !projectId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectApi.getProjectSentiments(
        workspaceId,
        projectId,
      );
      setSentimentResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load sentiments.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, projectId]);

  return { sentimentResult, isLoading, error, refetch: fetchData };
};
