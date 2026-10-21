import { useEffect, useRef, useState } from 'react';

import { projectApi } from '@/lib/api/project-api';
import { useProjectStore } from '@/stores/project-store';
import type { Project } from '@/types/project';

interface ProgressEvent {
  projectId: string;
  status: Project['processing']['status'];
  stage?: string | null;
  progress: number;
  crawledTweets?: number;
  totalTweets?: number;
  jobId?: string | null;
  error?: { stage: string; message: string } | null;
}

interface UseProjectProgressResult {
  project: Project | null;
  isConnected: boolean;
  error: string | null;
}

const TERMINAL_STATUSES: Project['processing']['status'][] = [
  'COMPLETED',
  'FAILED',
];

export const useProjectProgress = (
  workspaceId: string,
  projectId: string,
): UseProjectProgressResult => {
  const project = useProjectStore((state) => {
    const projects = state.projectsByWorkspace[workspaceId] ?? [];
    return projects.find((p) => p.id === projectId) ?? null;
  });

  const applyProgressEvent = useProjectStore(
    (state) => state.applyProgressEvent,
  );
  const fetchProjectById = useProjectStore((state) => state.fetchProjectById);

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;
    let finished = false;

    const stopPolling = () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };

    const clearRetryTimeout = () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };

    const startPolling = () => {
      if (pollIntervalRef.current) return;

      pollIntervalRef.current = setInterval(() => {
        void (async () => {
          const updated = await fetchProjectById(workspaceId, projectId, true);
          if (
            updated &&
            TERMINAL_STATUSES.includes(updated.processing.status)
          ) {
            stopPolling();
          }
        })();
      }, 5000);
    };

    if (!project) {
      void fetchProjectById(workspaceId, projectId, true);
      return () => {
        cancelled = true;
      };
    }

    if (TERMINAL_STATUSES.includes(project.processing.status)) {
      return () => {
        cancelled = true;
      };
    }

    const connect = () => {
      if (cancelled || finished) return;

      const url = projectApi.getProgressStreamUrl(workspaceId, projectId);
      const source = new EventSource(url);
      eventSourceRef.current = source;

      source.onopen = () => {
        setIsConnected(true);
        setError(null);
        retryCountRef.current = 0;
      };

      source.onmessage = (event) => {
        if (cancelled || finished) return;

        try {
          const data: ProgressEvent = JSON.parse(event.data);
          applyProgressEvent(projectId, data);

          if (TERMINAL_STATUSES.includes(data.status)) {
            finished = true;
            source.close();
            eventSourceRef.current = null;
            clearRetryTimeout();
            stopPolling();
            setIsConnected(false);
          }
        } catch {
          // ignore malformed or heartbeat frames
        }
      };

      source.onerror = () => {
        if (cancelled || finished) return;

        setIsConnected(false);
        source.close();
        eventSourceRef.current = null;

        if (retryCountRef.current < 3) {
          const backoff = Math.pow(2, retryCountRef.current) * 1000;
          retryCountRef.current += 1;
          retryTimeoutRef.current = setTimeout(connect, backoff);
        } else {
          setError('Connection lost. Falling back to polling.');
          startPolling();
        }
      };
    };

    connect();

    return () => {
      cancelled = true;
      finished = true;
      clearRetryTimeout();
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      stopPolling();
      retryCountRef.current = 0;
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    workspaceId,
    projectId,
    project?.processing.status,
    project?.processing.jobId,
    applyProgressEvent,
    fetchProjectById,
  ]);

  return { project, isConnected, error };
};
