import { Download, LoaderCircle, Play, Share2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import InfluencerRankingTable from '@/components/fragments/influencer/influencer-ranking-table';
import InfluencerSnapshot from '@/components/fragments/influencer/influencer-snaphot';
import RoleClassification from '@/components/fragments/influencer/role-classification';
import { useProjectInfluencers } from '@/hooks/use-project-influencers';
import { useProjectProgress } from '@/hooks/use-project-progress';
import { projectApi } from '@/lib/api/project-api';
import type { InfluencerBuzzer, InfluencerRole } from '@/types/project';

interface ProjectRouteParams {
  workspaceId: string;
  projectId: string;
  [key: string]: string | undefined;
}

const InfluencerPage = () => {
  const { workspaceId, projectId } = useParams<ProjectRouteParams>();
  const { influencers, isLoading, error, refetch } = useProjectInfluencers(
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
      toast.success('Influencer analysis queued');
      refetch();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Failed to start influencer analysis',
      );
    } finally {
      setIsTriggering(false);
    }
  };

  const mappedInfluencers = useMemo(() => {
    if (!influencers || influencers.length === 0) return [];

    const maxFinalMeasure = Math.max(
      ...influencers.map((inf) => inf.finalMeasure ?? 0),
      1e-6,
    );

    return influencers.map((inf): InfluencerBuzzer => {
      const influenceScore =
        inf.influenceScore ??
        Math.min(
          100,
          Math.round(((inf.finalMeasure ?? 0) / maxFinalMeasure) * 100),
        );

      let role: InfluencerRole = inf.role;
      if (!role) {
        const bet = inf.betweennessCentrality ?? 0;
        const eig = inf.eigenvectorCentrality ?? 0;
        if (bet / (eig + 1e-6) > 1.5) {
          role = 'Bridge';
        } else if (eig / (bet + 1e-6) > 1.5) {
          role = 'Amplifier';
        } else if (inf.rank <= 3) {
          role = 'Originator';
        } else {
          role = 'Engager';
        }
      }

      return {
        ...inf,
        influenceScore,
        role,
      };
    });
  }, [influencers]);

  const topInfluencer = mappedInfluencers[0]?.username ?? 'N/A';

  const snapshotMetrics = {
    totalAccounts: mappedInfluencers.length,
    activeInfluencers: mappedInfluencers.filter(
      (i) => i.role === 'Originator' || i.role === 'Amplifier',
    ).length,
    topInfluencer,
    highestEngagement: mappedInfluencers[0]?.username ?? 'N/A',
    mostActive: mappedInfluencers[1]?.username ?? 'N/A',
    estimatedReach: `${mappedInfluencers.length * 1000}`,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
      <div className="space-y-6 pb-10">
        {/* Page header */}
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              Socia Influencer
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-500">
              Identify the accounts shaping the narrative. Go beyond follower
              counts to discover who originates, amplifies, and connects
              conversations across the network.
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
              Run Influencer Analysis
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
              Export CSV
            </button>
          </div>
        </header>

        {isLoading && (
          <div className="flex items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
            <LoaderCircle className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-sm font-medium text-slate-600">
              Loading influencer data...
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button
              type="button"
              onClick={() => refetch()}
              className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Influencer snapshot */}
            <section>
              <InfluencerSnapshot metrics={snapshotMetrics} />
            </section>

            {/* Role classification */}
            <section className="w-full">
              <RoleClassification influencers={mappedInfluencers} />
            </section>

            {/* Ranking table */}
            <section className="w-full">
              <InfluencerRankingTable data={mappedInfluencers} />
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default InfluencerPage;
