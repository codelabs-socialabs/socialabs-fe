import { useEffect, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import type { TopicDocument } from '@/types/project';

interface UseTopicDocumentsResult {
  documents: TopicDocument[];
  isLoading: boolean;
  error: string | null;
}

export const useTopicDocuments = (
  workspaceId: string,
  projectId: string,
  topicId?: number,
): UseTopicDocumentsResult => {
  const [documents, setDocuments] = useState<TopicDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!workspaceId || !projectId) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    setError(null);

    projectApi
      .getTopicDocuments(workspaceId, projectId, topicId)
      .then((response) => {
        if (!cancelled) {
          setDocuments(response.data ?? []);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Unable to load documents.',
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
  }, [workspaceId, projectId, topicId]);

  return { documents, isLoading, error };
};
