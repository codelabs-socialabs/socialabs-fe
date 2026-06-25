import {
  useProjects,
  useCreateProject,
  useDeleteProject,
} from '@/features/project/hooks';
import { useWorkspaces } from '@/features/workspace/hooks';
import { toast } from 'sonner';
import { useWorkspaceStore } from '@/features/workspace/store';
import { Link, Navigate } from 'react-router';
import { Plus, Trash2, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import CreateProjectModal from '@/components/modals/create-project-modal';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function projectUrl(id: string, name: string): string {
  return `/app/projects/${id}-${slugify(name)}`;
}

export default function ProjectListPage() {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const { data: workspaces } = useWorkspaces();
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const workspaceExists = workspaces?.some((w) => w._id === activeWorkspaceId);

  if (!activeWorkspaceId || !workspaceExists) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your research projects
          </p>
        </div>
        {projects && projects.length > 0 && (
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={16} />
            Create Project
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
        </div>
      ) : projects?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
            <FolderOpen size={28} className="text-slate-400" />
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">No projects yet</h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm">
            Create your first project to start analyzing social media
            conversations.
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus size={16} />
            Create First Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <Link
                  to={projectUrl(project._id, project.name)}
                  className="font-semibold text-slate-900 hover:text-red-600 transition-colors"
                >
                  {project.name}
                </Link>
                <button
                  onClick={() =>
                    setDeleteTarget({ id: project._id, name: project.name })
                  }
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-400 uppercase">
                    Keyword
                  </span>
                  <span className="text-sm text-slate-700">
                    {project.keyword}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-400 uppercase">
                    Period
                  </span>
                  <span className="text-sm text-slate-700">
                    {project.startDate} → {project.endDate}
                  </span>
                </div>
              </div>
              <Link
                to={projectUrl(project._id, project.name)}
                className="inline-block mt-4 text-sm font-medium text-red-600 hover:text-red-700"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{' '}
              <strong>{deleteTarget?.name}</strong>? This will permanently
              remove all crawled tweets, analysis results, and project data.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  deleteProject.mutate(deleteTarget.id, {
                    onSuccess: () => toast.success('Project deleted'),
                    onError: () => toast.error('Failed to delete project'),
                  });
                  setDeleteTarget(null);
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={(data) => {
          createProject.mutate(data, {
            onSuccess: () => {
              setIsCreateModalOpen(false);
              toast.success('Project created');
            },
            onError: () => toast.error('Failed to create project'),
          });
        }}
        isLoading={createProject.isPending}
      />
    </div>
  );
}
