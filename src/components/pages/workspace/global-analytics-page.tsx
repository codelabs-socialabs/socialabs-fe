import { Navigate } from 'react-router';
import { LayoutDashboard } from 'lucide-react';
import { useWorkspaces } from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';

export default function GlobalAnalyticsPage() {
  const activeWorkspaceId = useWorkspaceStore((s) => s.activeWorkspaceId);
  const { data: workspaces } = useWorkspaces();

  const workspaceExists = workspaces?.some((w) => w._id === activeWorkspaceId);

  if (!activeWorkspaceId || !workspaceExists) {
    return <Navigate to="/app" replace />;
  }

  return (
    <div className="flex flex-col h-full items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
        <LayoutDashboard size={28} className="text-blue-500" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-slate-900 mb-1">
          Global Analytics
        </h1>
        <p className="text-sm text-slate-500">
          View analytics across all projects. Coming soon.
        </p>
      </div>
    </div>
  );
}
