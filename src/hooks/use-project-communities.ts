import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { SNACommunityResult } from '@/types/project';

interface UseProjectCommunitiesResult {
  communityResult: SNACommunityResult | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectCommunities = (
  workspaceId: string,
  projectId: string,
): UseProjectCommunitiesResult => {
  const [communityResult, setCommunityResult] =
    useState<SNACommunityResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!workspaceId || !projectId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectApi.getProjectCommunities(
        workspaceId,
        projectId,
      );
      setCommunityResult(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load communities.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, projectId]);

  return { communityResult, isLoading, error, refetch: fetchData };
};
