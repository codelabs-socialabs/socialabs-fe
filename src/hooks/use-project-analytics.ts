import { useEffect } from 'react';

import { useProjectStore } from '@/stores/project-store';
import type { ProjectAnalytics } from '@/types/project';

interface UseProjectAnalyticsResult {
  analytics: ProjectAnalytics | null;
  isLoading: boolean;
  error: string | null;
}

export const useProjectAnalytics = (
  workspaceId: string,
  projectId: string,
): UseProjectAnalyticsResult => {
  const analytics = useProjectStore((state) => state.getAnalytics(projectId));
  const isLoading = useProjectStore((state) =>
    state.isAnalyticsLoading(projectId),
  );
  const hasAnalyticsFailed = useProjectStore((state) =>
    state.hasAnalyticsFailed(projectId),
  );
  const fetchProjectAnalytics = useProjectStore(
    (state) => state.fetchProjectAnalytics,
  );
  const error = useProjectStore((state) => state.error);

  useEffect(() => {
    if (!analytics && !hasAnalyticsFailed && !isLoading) {
      fetchProjectAnalytics(workspaceId, projectId);
    }
  }, [
    analytics,
    workspaceId,
    projectId,
    fetchProjectAnalytics,
    hasAnalyticsFailed,
    isLoading,
  ]);

  return { analytics, isLoading, error };
};
