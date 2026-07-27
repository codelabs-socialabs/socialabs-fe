import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspaceStore } from '@/features/workspace/store';
import { projectService } from './services';
import type { CreateProjectRequest } from './types';

export function extractProjectId(param: string): string {
  return param.split('-')[0];
}

export function useProjects() {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

  return useQuery({
    queryKey: ['projects', activeWorkspaceId],
    queryFn: () => projectService.getList(activeWorkspaceId!),
    enabled: !!activeWorkspaceId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const hasActive = data.some(
        (p) =>
          p.processing?.status === 'CRAWLING' ||
          p.processing?.status === 'MODELING',
      );
      return hasActive ? 5000 : false;
    },
  });
}

export function useProject(projectId: string) {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

  return useQuery({
    queryKey: ['projects', activeWorkspaceId, projectId],
    queryFn: () => projectService.getDetail(activeWorkspaceId!, projectId),
    enabled: !!activeWorkspaceId && !!projectId,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data) return false;
      const status = data.processing?.status;
      if (status === 'CRAWLING' || status === 'MODELING') {
        return 3000;
      }
      return false;
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

  return useMutation({
    mutationFn: (data: CreateProjectRequest) =>
      projectService.create(activeWorkspaceId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', activeWorkspaceId],
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

  return useMutation({
    mutationFn: (projectId: string) =>
      projectService.delete(activeWorkspaceId!, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', activeWorkspaceId],
      });
    },
  });
}

export function useRecrawl() {
  const queryClient = useQueryClient();
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

  return useMutation({
    mutationFn: (projectId: string) =>
      projectService.recrawl(activeWorkspaceId!, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', activeWorkspaceId],
      });
    },
  });
}

export function useProjectAnalytics(projectId: string) {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);

  return useQuery({
    queryKey: ['project-analytics', activeWorkspaceId, projectId],
    queryFn: () => projectService.getAnalytics(activeWorkspaceId!, projectId),
    enabled: !!activeWorkspaceId && !!projectId,
    refetchInterval: 30000,
  });
}
