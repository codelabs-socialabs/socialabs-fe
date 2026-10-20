import { useEffect } from 'react';

import { useProjectStore } from '@/stores/project-store';
import type { Topic } from '@/types/project';

interface UseProjectTopicsResult {
  topics: Topic[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useProjectTopics = (
  workspaceId: string,
  projectId: string,
): UseProjectTopicsResult => {
  const topics = useProjectStore((state) => state.getTopics(projectId));
  const isLoading = useProjectStore((state) =>
    state.isTopicsLoading(projectId),
  );
  const hasFailed = useProjectStore((state) =>
    state.hasTopicsFailed(projectId),
  );
  const fetchProjectTopics = useProjectStore(
    (state) => state.fetchProjectTopics,
  );
  const error = useProjectStore((state) => state.error);

  useEffect(() => {
    if (!topics && !isLoading && !hasFailed) {
      void fetchProjectTopics(workspaceId, projectId);
    }
  }, [
    topics,
    isLoading,
    hasFailed,
    workspaceId,
    projectId,
    fetchProjectTopics,
  ]);

  const refetch = () => {
    void fetchProjectTopics(workspaceId, projectId);
  };

  return { topics, isLoading, error, refetch };
};
