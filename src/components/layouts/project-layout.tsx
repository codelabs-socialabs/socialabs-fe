import { LoaderCircle } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';

import ProjectNavbar from '@/components/fragments/navbar';
import ProjectSidebar from '@/components/fragments/project/project-sidebar';
import { useProjectStore } from '@/stores/project-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import type { Project } from '@/types/project';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
}

const EMPTY_PROJECTS: Project[] = [];

const ProjectLayout = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const isWorkspaceLoading = useWorkspaceStore((state) => state.isLoading);
  const isWorkspaceInitialized = useWorkspaceStore(
    (state) => state.isInitialized,
  );
  const fetchWorkspaces = useWorkspaceStore((state) => state.fetchWorkspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );

  const fetchProjects = useProjectStore((state) => state.fetchProjects);
  const fetchProjectById = useProjectStore((state) => state.fetchProjectById);
  const projects = useProjectStore(
    (state) => state.projectsByWorkspace[workspaceId ?? ''] ?? EMPTY_PROJECTS,
  );

  useEffect(() => {
    if (!isWorkspaceInitialized && !isWorkspaceLoading) {
      void fetchWorkspaces();
    }
  }, [fetchWorkspaces, isWorkspaceInitialized, isWorkspaceLoading]);

  useEffect(() => {
    if (workspaceId) {
      fetchProjects(workspaceId);
    }
  }, [workspaceId, fetchProjects]);

  const workspace = useMemo(() => {
    if (!workspaceId) {
      return undefined;
    }

    return workspaces.find((item) => item.id === workspaceId);
  }, [workspaceId, workspaces]);

  const project = useMemo(() => {
    if (!workspaceId || !projectId) {
      return undefined;
    }

    return projects.find((item) => item.id === projectId);
  }, [projectId, workspaceId, projects]);

  useEffect(() => {
    if (!workspace || activeWorkspaceId === workspace.id) {
      return;
    }

    setActiveWorkspace(workspace.id);
  }, [activeWorkspaceId, setActiveWorkspace, workspace]);

  const isProjectsInitialized = useProjectStore((state) =>
    state.initializedWorkspaceIds.includes(workspaceId ?? ''),
  );

  useEffect(() => {
    if (!workspaceId || !projectId || project || !isProjectsInitialized) {
      return;
    }

    void fetchProjectById(workspaceId, projectId);
  }, [
    workspaceId,
    projectId,
    project,
    isProjectsInitialized,
    fetchProjectById,
  ]);

  if (!workspaceId || !projectId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!isWorkspaceInitialized || isWorkspaceLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin text-red-600" />
          <span>Loading workspace...</span>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin text-red-600" />
          <span>Loading project...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
      <ProjectSidebar workspace={workspace} project={project} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <ProjectNavbar workspace={workspace} project={project} />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet
            context={{
              workspace,
              project,
            }}
          />
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;
