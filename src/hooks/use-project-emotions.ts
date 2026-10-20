import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { EmotionResult } from '@/types/project';

interface UseProjectEmotionsResult {
  emotionResult: EmotionResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectEmotions = (
  workspaceId: string,
  projectId: string,
): UseProjectEmotionsResult => {
  const [emotionResult, setEmotionResult] = useState<EmotionResult | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!workspaceId || !projectId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectApi.getProjectEmotions(
        workspaceId,
        projectId,
      );
      setEmotionResult(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load emotions.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, projectId]);

  return { emotionResult, isLoading, error, refetch: fetchData };
};
