import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router';

import { useProjectStore } from '@/stores/project-store';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
}

const ProjectEntryPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();

  const projects = useProjectStore((state) => state.projects);

  const project = useMemo(
    () =>
      projects.find(
        (item) => item.id === projectId && item.workspaceId === workspaceId,
      ),
    [projectId, projects, workspaceId],
  );

  if (!workspaceId || !projectId) {
    return <Navigate to="/workspace" replace />;
  }

  if (!project) {
    return <Navigate to={`/workspaces/${workspaceId}/projects`} replace />;
  }

  const destination =
    project.status === 'COMPLETED' ? 'overview' : 'processing';

  return <Navigate to={destination} replace />;
};

export default ProjectEntryPage;
