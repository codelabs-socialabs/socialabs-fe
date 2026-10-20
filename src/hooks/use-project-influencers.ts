import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { InfluencerBuzzer } from '@/types/project';

interface UseProjectInfluencersResult {
  influencers: InfluencerBuzzer[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectInfluencers = (
  workspaceId: string,
  projectId: string,
): UseProjectInfluencersResult => {
  const [influencers, setInfluencers] = useState<InfluencerBuzzer[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!workspaceId || !projectId) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await projectApi.getProjectInfluencers(
        workspaceId,
        projectId,
      );
      setInfluencers(response.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load influencers.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, projectId]);

  return { influencers, isLoading, error, refetch: fetchData };
};
