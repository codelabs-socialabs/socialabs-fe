import { Crown } from 'lucide-react';
import { Link } from 'react-router';
import { useWorkspaces } from '@/features/workspace/hooks';
import { useWorkspaceStore } from '@/features/workspace/store';

export default function UpgradeFooter() {
  const { data: workspaces } = useWorkspaces();
  const { activeWorkspaceId } = useWorkspaceStore();

  const activeWorkspace = workspaces?.find((w) => w._id === activeWorkspaceId);

  if (!activeWorkspace || activeWorkspace.plan !== 'FREE') return null;

  return (
    <div className="p-4 border-t border-slate-100 shrink-0">
      <Link
        to="/app/settings"
        className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
      >
        <Crown size={16} className="text-amber-600 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-amber-800">Free Plan</p>
          <p className="text-[11px] text-amber-600">Upgrade to Premium</p>
        </div>
      </Link>
    </div>
  );
}
