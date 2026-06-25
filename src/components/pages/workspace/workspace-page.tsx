import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { Briefcase, Plus } from 'lucide-react';
import { useWorkspaces, useCreateWorkspace } from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';
import CreateWorkspaceModal from '@/components/modals/create-workspace-modal';

const WorkspacePage = () => {
  const { data: workspaces, isLoading } = useWorkspaces();
  const createWorkspace = useCreateWorkspace();
  const { activeWorkspaceId, setActiveWorkspace } = useWorkspaceStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    if (
      !isLoading &&
      workspaces &&
      workspaces.length > 0 &&
      !activeWorkspaceId
    ) {
      setActiveWorkspace(workspaces[workspaces.length - 1]._id);
    }
  }, [workspaces, isLoading, activeWorkspaceId, setActiveWorkspace]);

  const handleCreateWorkspace = (data: {
    name: string;
    description?: string;
  }) => {
    createWorkspace.mutate(
      { ...data, plan: 'FREE' },
      {
        onSuccess: (workspace) => {
          setActiveWorkspace(workspace._id);
          setIsCreateModalOpen(false);
          toast.success('Workspace created');
        },
        onError: () => toast.error('Failed to create workspace'),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (workspaces && workspaces.length > 0) {
    return <Navigate to="/app/projects" replace />;
  }

  return (
    <>
      <div className="flex flex-col h-full items-center justify-center max-w-md mx-auto text-center space-y-5 pb-10">
        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm mb-2">
          <Briefcase size={28} className="text-slate-400" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">
            Welcome to Socialabs
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Start analyzing public conversations by creating a new workspace.
            Workspaces act as containers for managing your research projects and
            team.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 shadow-sm transition-colors mt-2"
        >
          <Plus size={16} />
          Create First Workspace
        </button>
      </div>

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateWorkspace}
        isLoading={createWorkspace.isPending}
      />
    </>
  );
};

export default WorkspacePage;
