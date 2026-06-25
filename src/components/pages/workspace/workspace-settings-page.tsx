import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Crown, Trash2 } from 'lucide-react';
import {
  useWorkspaces,
  useUpdateWorkspace,
  useDeleteWorkspace,
} from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const WorkspaceSettingsPage = () => {
  const navigate = useNavigate();
  const { data: workspaces } = useWorkspaces();
  const { activeWorkspaceId, setActiveWorkspace } = useWorkspaceStore();
  const updateWorkspace = useUpdateWorkspace();
  const deleteWorkspace = useDeleteWorkspace();

  const activeWorkspace = workspaces?.find((w) => w._id === activeWorkspaceId);

  const [name, setName] = useState(activeWorkspace?.name ?? '');
  const [description, setDescription] = useState(
    activeWorkspace?.description ?? '',
  );
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!activeWorkspaceId || !activeWorkspace) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-slate-500">No workspace selected</p>
      </div>
    );
  }

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateWorkspace.mutate(
      { id: activeWorkspaceId, data: { name, description } },
      {
        onSettled: () => setIsSaving(false),
        onSuccess: () => toast.success('Workspace updated'),
        onError: () => toast.error('Failed to update workspace'),
      },
    );
  };

  const handleUpgrade = () => {
    updateWorkspace.mutate(
      {
        id: activeWorkspaceId,
        data: { plan: 'PREMIUM' },
      },
      {
        onSuccess: () => toast.success('Upgraded to Premium'),
      },
    );
  };

  const handleDelete = () => {
    if (deleteConfirm !== activeWorkspace.name) return;
    deleteWorkspace.mutate(activeWorkspaceId, {
      onSuccess: () => {
        setActiveWorkspace('');
        navigate('/app');
        toast.success('Workspace deleted');
      },
      onError: () => toast.error('Failed to delete workspace'),
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      {/* General Section */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">General</h2>
        <form onSubmit={handleSaveGeneral} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ws-settings-name">Workspace Name</Label>
            <Input
              id="ws-settings-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ws-settings-desc">
              Description <span className="text-slate-400">(optional)</span>
            </Label>
            <Textarea
              id="ws-settings-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving || !name.trim()}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </section>

      {/* Plan Section */}
      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-base font-semibold text-slate-900 mb-4">Plan</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activeWorkspace.plan === 'PREMIUM'
                  ? 'bg-amber-50'
                  : 'bg-slate-100'
              }`}
            >
              <Crown
                size={20}
                className={
                  activeWorkspace.plan === 'PREMIUM'
                    ? 'text-amber-600'
                    : 'text-slate-400'
                }
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {activeWorkspace.plan === 'PREMIUM'
                  ? 'Premium Plan'
                  : 'Free Plan'}
              </p>
              <p className="text-xs text-slate-500">
                {activeWorkspace.plan === 'PREMIUM'
                  ? 'Full access to all features'
                  : 'Basic features with limits'}
              </p>
            </div>
          </div>
          {activeWorkspace.plan === 'FREE' && (
            <Button
              variant="outline"
              onClick={handleUpgrade}
              disabled={updateWorkspace.isPending}
              className="text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200"
            >
              {updateWorkspace.isPending
                ? 'Upgrading...'
                : 'Upgrade to Premium'}
            </Button>
          )}
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-white rounded-xl border border-red-200 p-6">
        <h2 className="text-base font-semibold text-red-700 mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Deleting a workspace will permanently remove all projects and data
          inside it. This action cannot be undone.
        </p>
        <div className="flex items-center gap-3">
          <Input
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder={`Type "${activeWorkspace.name}" to confirm`}
            className="flex-1"
          />
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={
              deleteConfirm !== activeWorkspace.name ||
              deleteWorkspace.isPending
            }
          >
            <Trash2 size={14} />
            {deleteWorkspace.isPending ? 'Deleting...' : 'Delete Workspace'}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default WorkspaceSettingsPage;
