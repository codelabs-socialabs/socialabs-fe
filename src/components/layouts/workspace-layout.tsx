import { LoaderCircle } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';

import WorkspaceNavbar from '@/components/fragments/navbar';
import WorkspaceSidebar from '@/components/fragments/workspace/workspace-sidebar';
import { useWorkspaceStore } from '@/stores/workspace-store';

interface WorkspaceRouteParams extends Record<string, string | undefined> {
  workspaceId: string;
}

const WorkspaceLayout = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  /*
   * Mencegah request detail workspace yang sama
   * dilakukan berulang kali.
   */
  const requestedWorkspaceIdRef = useRef<string | null>(null);

  const [hasFinishedWorkspaceLookup, setHasFinishedWorkspaceLookup] =
    useState(false);

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  const isLoading = useWorkspaceStore((state) => state.isLoading);

  const isInitialized = useWorkspaceStore((state) => state.isInitialized);

  const fetchWorkspaces = useWorkspaceStore((state) => state.fetchWorkspaces);

  const fetchWorkspaceById = useWorkspaceStore(
    (state) => state.fetchWorkspaceById,
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
   * Pastikan daftar workspace tersedia saat user:
   *
   * - refresh halaman workspace;
   * - membuka URL workspace secara langsung;
   * - masuk dari bookmark.
   */
  useEffect(() => {
    if (isInitialized) {
      return;
    }

    void fetchWorkspaces();
  }, [fetchWorkspaces, isInitialized]);

  /*
   * Setelah daftar workspace selesai dimuat tetapi workspace
   * dari URL belum ditemukan, coba ambil detail workspace.
   *
   * Ini berguna jika endpoint list dan detail mengembalikan
   * struktur data yang berbeda atau list belum memiliki
   * workspace terbaru.
   */
  useEffect(() => {
    if (!workspaceId) {
      return;
    }

    if (!isInitialized || isLoading) {
      return;
    }

    if (workspace) {
      requestedWorkspaceIdRef.current = null;
      setHasFinishedWorkspaceLookup(true);
      return;
    }

    if (requestedWorkspaceIdRef.current === workspaceId) {
      return;
    }

    requestedWorkspaceIdRef.current = workspaceId;
    setHasFinishedWorkspaceLookup(false);

    const loadWorkspaceDetail = async (): Promise<void> => {
      try {
        await fetchWorkspaceById(workspaceId);
      } finally {
        setHasFinishedWorkspaceLookup(true);
      }
    };

    void loadWorkspaceDetail();
  }, [fetchWorkspaceById, isInitialized, isLoading, workspace, workspaceId]);

  /*
   * Ketika parameter workspace berubah, reset status lookup.
   */
  useEffect(() => {
    requestedWorkspaceIdRef.current = null;
    setHasFinishedWorkspaceLookup(false);
  }, [workspaceId]);

  /*
   * URL menjadi sumber utama workspace aktif.
   */
  useEffect(() => {
    if (!workspace) {
      return;
    }

    if (activeWorkspaceId === workspace.id) {
      return;
    }

    setActiveWorkspace(workspace.id);
  }, [activeWorkspaceId, setActiveWorkspace, workspace]);

  if (!workspaceId) {
    return <Navigate to="/workspaces" replace />;
  }

  /*
   * Tunggu proses inisialisasi list workspace.
   */
  if (!isInitialized || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin text-red-600" />

          <span>Loading workspace...</span>
        </div>
      </div>
    );
  }

  /*
   * List sudah selesai, tetapi detail workspace dari URL
   * masih sedang dicoba.
   */
  if (!workspace && !hasFinishedWorkspaceLookup) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="h-5 w-5 animate-spin text-red-600" />

          <span>Loading workspace...</span>
        </div>
      </div>
    );
  }

  /*
   * Workspace tidak ditemukan setelah list dan detail selesai.
   *
   * Kemungkinan:
   * - ID workspace tidak valid;
   * - workspace sudah dihapus;
   * - user bukan anggota;
   * - backend mengembalikan 403 atau 404.
   */
  if (!workspace) {
    return <Navigate to="/workspaces" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      <WorkspaceSidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <WorkspaceNavbar />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WorkspaceLayout;
