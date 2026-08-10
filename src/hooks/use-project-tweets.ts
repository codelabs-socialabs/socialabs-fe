import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { TweetListResult } from '@/types/project';

interface UseProjectTweetsResult {
  data: TweetListResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: (page?: number, limit?: number) => Promise<void>;
}

export const useProjectTweets = (
  workspaceId: string,
  projectId: string,
  initialPage = 1,
  initialLimit = 25,
): UseProjectTweetsResult => {
  const [data, setData] = useState<TweetListResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = async (page?: number, limit?: number): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectApi.getProjectTweets(
        workspaceId,
        projectId,
        page ?? initialPage,
        limit ?? initialLimit,
      );
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load tweets.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (workspaceId && projectId) {
      refetch(initialPage, initialLimit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, projectId, initialPage, initialLimit]);

  return { data, isLoading, error, refetch };
};
