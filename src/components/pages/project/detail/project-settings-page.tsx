import { useParams, useNavigate } from 'react-router';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  useProject,
  useDeleteProject,
  extractProjectId,
} from '@/features/project/hooks';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ProjectSettingsPage() {
  const { id: rawId } = useParams<{ id: string }>();
  const id = extractProjectId(rawId!);
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id!);
  const deleteProject = useDeleteProject();
  const [deleteConfirm, setDeleteConfirm] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (!project) return null;

  const handleDelete = () => {
    if (deleteConfirm !== project.name) return;
    deleteProject.mutate(id!, {
      onSuccess: () => {
        navigate('/app/projects');
        toast.success('Project deleted');
      },
      onError: () => toast.error('Failed to delete project'),
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Info</CardTitle>
          <CardDescription>Read-only project details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Name
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.name}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Category
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.category}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Keyword
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.keyword}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Language
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.language === 'ID' ? 'Indonesian' : 'English'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Period
              </p>
              <p className="text-sm font-medium text-slate-900">
                {project.startDate} — {project.endDate}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase mb-1">
                Status
              </p>
              <Badge>{project.processing?.status ?? 'CREATED'}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-red-200">
        <CardHeader>
          <div className="flex items-start gap-3">
            <Trash2 size={20} className="text-red-600 mt-1" />
            <div>
              <CardTitle className="text-red-700">Delete Project</CardTitle>
              <CardDescription>
                Permanently delete this project and all its data
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500 mb-4">
            This will delete all crawled tweets, analysis results, and project
            data. This action cannot be undone.
          </p>
          <div className="flex items-center gap-3">
            <Input
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder={`Type "${project.name}" to confirm`}
              className="flex-1"
            />
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={
                deleteConfirm !== project.name || deleteProject.isPending
              }
            >
              {deleteProject.isPending ? 'Deleting...' : 'Delete Project'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
