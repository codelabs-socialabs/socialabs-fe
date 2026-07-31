import { AlertCircle, LoaderCircle } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { Navigate } from 'react-router';

import { workspaceApi } from '@/lib/api/workspace-api';
import { useAuthStore } from '@/stores/auth-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { ApiError } from '@/types/api';

const WorkspaceEntryPage = () => {
  const hasLoadedWorkspaces = useRef(false);

  const user = useAuthStore((state) => state.user);

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  const isLoading = useWorkspaceStore((state) => state.isLoading);

  const isInitialized = useWorkspaceStore((state) => state.isInitialized);

  const error = useWorkspaceStore((state) => state.error);

  const setWorkspaces = useWorkspaceStore((state) => state.setWorkspaces);

  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace,
  );

  const setLoading = useWorkspaceStore((state) => state.setLoading);

  const setInitialized = useWorkspaceStore((state) => state.setInitialized);

  const setError = useWorkspaceStore((state) => state.setError);

  useEffect(() => {
    if (hasLoadedWorkspaces.current || isInitialized) {
      return;
    }

    hasLoadedWorkspaces.current = true;

    const loadWorkspaces = async (): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const response = await workspaceApi.getWorkspaces();
        console.info(response);

        setWorkspaces(response.data);
      } catch (requestError) {
        if (requestError instanceof ApiError) {
          setError(requestError.message);
        } else {
          setError('Unable to load your workspaces. Please try again.');
        }

        setWorkspaces([]);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    void loadWorkspaces();
  }, [isInitialized, setError, setInitialized, setLoading, setWorkspaces]);

  const targetWorkspace = useMemo(() => {
    const storedWorkspace = workspaces.find(
      (workspace) => workspace.id === activeWorkspaceId,
    );

    const lastActiveWorkspace = workspaces.find(
      (workspace) => workspace.id === user?.lastActiveWorkspaceId,
    );

    const personalWorkspace = workspaces.find(
      (workspace) =>
        workspace.id === user?.personalWorkspaceId || workspace.isPersonal,
    );

    return (
      storedWorkspace ??
      lastActiveWorkspace ??
      personalWorkspace ??
      workspaces[0] ??
      null
    );
  }, [
    activeWorkspaceId,
    user?.lastActiveWorkspaceId,
    user?.personalWorkspaceId,
    workspaces,
  ]);

  useEffect(() => {
    if (targetWorkspace && activeWorkspaceId !== targetWorkspace.id) {
      setActiveWorkspace(targetWorkspace.id);
    }
  }, [activeWorkspaceId, setActiveWorkspace, targetWorkspace]);

  if (!isInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle className="size-5 animate-spin text-[#d81b27]" />

          <span>Loading your workspace...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="max-w-md text-center">
          <AlertCircle className="mx-auto size-7 text-red-600" />

          <h1 className="mt-4 text-lg font-semibold text-slate-900">
            Unable to load workspaces
          </h1>

          <p className="mt-2 text-sm text-slate-500">{error}</p>

          <button
            type="button"
            onClick={() => {
              hasLoadedWorkspaces.current = false;
              setInitialized(false);
            }}
            className="mt-5 rounded-lg bg-[#d81b27] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!targetWorkspace) {
    return <Navigate to="/workspaces/new" replace />;
  }

  return <Navigate to={`/workspaces/${targetWorkspace.id}/overview`} replace />;
};

export default WorkspaceEntryPage;
