import { useEffect, useMemo } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';

import ProjectNavbar from '@/components/fragments/navbar';
import ProjectSidebar from '@/components/fragments/project/project-sidebar';
import { useWorkspaceStore } from '@/stores/workspace-store';
import type {
  Project,
  ProjectCategory,
  ProjectLanguage,
  ProjectStatus,
} from '@/types/project';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
}

/*
 * Data dummy project sementara.
 *
 * Nanti bagian ini bisa dihapus ketika ProjectLayout
 * sudah memakai data asli dari project store/API.
 */
const createDummyProject = (
  workspaceId: string,
  projectId: string,
): Project => {
  return {
    id: projectId,
    workspaceId,

    name: 'Public Sentiment Toward Artificial Intelligence',

    description:
      'Analyze public conversations about the adoption, benefits, and concerns surrounding artificial intelligence in Indonesia.',

    category: 'MARKETING' as ProjectCategory,

    keyword: 'artificial intelligence Indonesia',

    startDate: '2026-07-01T00:00:00.000Z',
    endDate: '2026-07-30T23:59:59.000Z',

    language: 'ID' as ProjectLanguage,

    /*
     * Struktur backend terbaru.
     */
    processing: {
      status: 'CRAWLING' as ProjectStatus,
      stage: 'CRAWLING',
      progress: 62,
      error: null,
    },

    totalTweets: 10_000,
    crawledTweets: 6_240,
    topicCounte: 0,

    createdAt: '2026-07-30T08:15:00.000Z',
    updatedAt: '2026-07-31T03:40:00.000Z',

    /*
     * Compatibility field untuk UI lama.
     */
    status: 'CRAWLING' as ProjectStatus,
    isArchived: false,
    dataLimit: 10_000,
    tweetsRetrieved: 6_240,
    topicsCount: 0,
  };
};

const ProjectLayout = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );

  const workspace = useMemo(() => {
    if (!workspaceId) {
      return undefined;
    }

    return workspaces.find((item) => item.id === workspaceId);
  }, [workspaceId, workspaces]);

  /*
   * Data project langsung dibuat dari route param.
   *
   * Project tetap memiliki projectId dan workspaceId
   * sesuai URL yang sedang dibuka.
   */
  const project = useMemo(() => {
    if (!workspaceId || !projectId) {
      return undefined;
    }

    return createDummyProject(workspaceId, projectId);
  }, [projectId, workspaceId]);

  useEffect(() => {
    if (!workspace || activeWorkspaceId === workspace.id) {
      return;
    }

    setActiveWorkspace(workspace.id);
  }, [activeWorkspaceId, setActiveWorkspace, workspace]);

  if (!workspaceId || !projectId) {
    return <Navigate to="/workspaces" replace />;
  }

  if (!workspace) {
    return <Navigate to="/workspaces" replace />;
  }

  /*
   * Sebenarnya kondisi ini hampir tidak akan terjadi
   * karena project dibuat langsung dari route param.
   */
  if (!project) {
    return <Navigate to={`/workspaces/${workspace.id}/projects`} replace />;
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
