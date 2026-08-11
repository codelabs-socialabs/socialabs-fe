import { useParams } from 'react-router';

import { useWorkspaceStore } from '@/stores/workspace-store';
import { WorkspacePlan, type WorkspaceUsage } from '@/types/workspace';

interface WorkspaceRouteParams extends Record<string, string | undefined> {
  workspaceId: string;
}

const workspaceUsageFallback: Record<WorkspacePlan, WorkspaceUsage> = {
  [WorkspacePlan.FREE]: {
    used: 0,
    limit: 10_000,
  },

  [WorkspacePlan.PRO]: {
    used: 0,
    limit: 50_000,
  },

  [WorkspacePlan.ENTERPRISE]: {
    used: 0,
    limit: 250_000,
  },
};

const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
};

const normalizeWorkspaceUsage = (
  usage: WorkspaceUsage | undefined,
  plan: WorkspacePlan,
): WorkspaceUsage => {
  const fallback = workspaceUsageFallback[plan];

  if (!usage) {
    return fallback;
  }

  const used = Number.isFinite(usage.used)
    ? Math.max(usage.used, 0)
    : fallback.used;

  const limit = Number.isFinite(usage.limit)
    ? Math.max(usage.limit, 0)
    : fallback.limit;

  return {
    used,
    limit,
  };
};

const WorkspaceQuota = () => {
  const { workspaceId } = useParams<WorkspaceRouteParams>();

  const workspaces = useWorkspaceStore((state) => state.workspaces);

  const activeWorkspaceId = useWorkspaceStore(
    (state) => state.activeWorkspaceId,
  );

  /*
   * URL menjadi sumber utama.
   * activeWorkspaceId menjadi fallback.
   */
  const currentWorkspaceId = workspaceId ?? activeWorkspaceId;

  const activeWorkspace = workspaces.find(
    (workspace) => workspace.id === currentWorkspaceId,
  );

  if (!activeWorkspace) {
    return null;
  }

  const workspaceUsage = normalizeWorkspaceUsage(
    activeWorkspace.usage,
    activeWorkspace.plan,
  );

  const percentage =
    workspaceUsage.limit > 0
      ? Math.min(
          Math.max((workspaceUsage.used / workspaceUsage.limit) * 100, 0),
          100,
        )
      : 0;

  return (
    <div className="m-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-700">Data Quota</span>

        <span className="rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
          {activeWorkspace.plan}
        </span>
      </div>

      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-red-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-[10px] text-slate-500">
        <span>{formatCompactNumber(workspaceUsage.used)} used</span>

        <span>{formatCompactNumber(workspaceUsage.limit)} limit</span>
      </div>
    </div>
  );
};

export default WorkspaceQuota;
