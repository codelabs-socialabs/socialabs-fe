import { useEffect, useMemo } from 'react';
import { Navigate, useParams } from 'react-router';

import { useProjectStore } from '@/stores/project-store';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
}

const ProjectEntryPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();

  const projects = useProjectStore(
    (state) => state.projectsByWorkspace[workspaceId ?? ''] ?? [],
  );
  const fetchProjectById = useProjectStore((state) => state.fetchProjectById);

  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projects, projectId],
  );

  useEffect(() => {
    if (workspaceId && projectId && !project) {
      fetchProjectById(workspaceId, projectId);
    }
  }, [workspaceId, projectId, project, fetchProjectById]);

  if (!workspaceId || !projectId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!project) {
    return null;
  }

  const destination =
    project.processing.status === 'COMPLETED' ? 'overview' : 'processing';

  return <Navigate to={destination} replace />;
};

export default ProjectEntryPage;
