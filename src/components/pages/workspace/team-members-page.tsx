import { Navigate } from 'react-router';
import { Users } from 'lucide-react';
import { useWorkspaces } from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';

export default function TeamMembersPage() {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const { data: workspaces } = useWorkspaces();

  const workspaceExists = workspaces?.some((w) => w._id === activeWorkspaceId);

  if (!activeWorkspaceId || !workspaceExists) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="flex flex-col h-full items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center">
        <Users size={28} className="text-green-500" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">Team Members</h1>
        <p className="text-sm text-slate-500">
          Invite and manage team access. Coming soon.
        </p>
      </div>
    </div>
  );
}
