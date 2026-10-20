import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { WordFrequency } from '@/types/project';

interface UseWordFrequencyResult {
  wordFrequency: WordFrequency | null;
  isLoading: boolean;
  error: string | null;
}

export const useWordFrequency = (
  workspaceId: string,
  projectId: string,
): UseWordFrequencyResult => {
  const [wordFrequency, setWordFrequency] = useState<WordFrequency | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workspaceId || !projectId) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setError(null);

    projectApi
      .getWordFrequency(workspaceId, projectId)
      .then((response) => {
        if (!cancelled) {
          setWordFrequency(response.data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load word frequency.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [workspaceId, projectId]);

  return { wordFrequency, isLoading, error };
};
