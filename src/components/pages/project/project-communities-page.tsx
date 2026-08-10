import { Download, LoaderCircle, Play, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react';
import { toast } from 'sonner';

import SNACentralNode from '@/components/fragments/sna/sna-central-node';
import SNACommunitySummary from '@/components/fragments/sna/sna-community-summary';
import SNAConversation from '@/components/fragments/sna/sna-conversation';
import SNANetworkGraph from '@/components/fragments/sna/sna-nework-grap';
import SNASnapshot from '@/components/fragments/sna/sna-snapshot';
import { useProjectCommunities } from '@/hooks/use-project-communities';
import { useProjectProgress } from '@/hooks/use-project-progress';
import { projectApi } from '@/lib/api/project-api';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const SNAPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();
  const { communityResult, isLoading, error, refetch } = useProjectCommunities(
    workspaceId ?? '',
    projectId ?? '',
  );

  useProjectProgress(workspaceId ?? '', projectId ?? '');

  const [isTriggering, setIsTriggering] = useState(false);

  const handleRunAnalysis = async () => {
    if (!workspaceId || !projectId) return;
    try {
      setIsTriggering(true);
      await projectApi.processSNA(workspaceId, projectId);
      toast.success('Community analysis queued');
      refetch();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Failed to start community analysis',
      );
    } finally {
      setIsTriggering(false);
    }
  };

  const snapshotMetrics = {
    totalNodes: communityResult?.totalNodes ?? 0,
    totalConnections: communityResult?.totalEdges ?? 0,
    networkDensity: communityResult?.totalNodes
      ? Number(
          (
            (2 * (communityResult.totalEdges ?? 0)) /
            (communityResult.totalNodes * (communityResult.totalNodes - 1) || 1)
          ).toFixed(3),
        )
      : 0,
    largestCommunity: communityResult?.totalCommunities
      ? `${communityResult.totalCommunities} Communities`
      : 'N/A',
    centralNode: communityResult?.nodes?.[0]?.name ?? 'N/A',
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 py-8 lg:px-8">
      <div className="space-y-6 pb-10">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Social Network Analysis
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Explore how conversations move across the network. Discover
              communities, central actors, echo chambers, and the accounts
              connecting otherwise separated groups.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={isTriggering}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {isTriggering ? (
                <LoaderCircle size={16} className="animate-spin" />
              ) : (
                <Play size={16} />
              )}
              Run Community Analysis
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Share2 size={16} />
              Share
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              <Download size={16} />
              Export Graph Data
            </button>
          </div>
        </header>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-slate-500">
            <LoaderCircle className="mr-3 h-6 w-6 animate-spin text-emerald-600" />
            <span>Loading community network data...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
            <p className="font-semibold">Error loading community data</p>
            <p className="mt-1 text-sm">{error}</p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Content View */}
        {!isLoading && !error && (
          <>
            {/* Empty State warning if no community result */}
            {(!communityResult || communityResult.nodes.length === 0) && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    No community data available yet
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    Run community analysis to process network topology and
                    uncover network clusters.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRunAnalysis}
                  disabled={isTriggering}
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-amber-700 disabled:opacity-50"
                >
                  {isTriggering ? (
                    <LoaderCircle size={14} className="animate-spin" />
                  ) : (
                    <Play size={14} />
                  )}
                  Run Analysis
                </button>
              </div>
            )}

            {/* Network snapshot */}
            <section>
              <SNASnapshot metrics={snapshotMetrics} />
            </section>

            {/* Graph and community summary */}
            <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-4">
              <div className="min-w-0 xl:col-span-3">
                <SNANetworkGraph data={communityResult} />
              </div>

              <div className="min-w-0 xl:col-span-1">
                <SNACommunitySummary />
              </div>
            </section>

            {/* Central nodes */}
            <section>
              <SNACentralNode />
            </section>

            {/* Conversation samples */}
            <section>
              <SNAConversation />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default SNAPage;
