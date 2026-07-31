import { Download, Share2 } from 'lucide-react';

import InfluencerRankingTable from '@/components/fragments/influencer/influencer-ranking-table';
import InfluencerSnapshot from '@/components/fragments/influencer/influencer-snaphot';
import RoleClassification from '@/components/fragments/influencer/role-classification';

const InfluencerPage = () => {
  const snapshotMetrics = {
    totalAccounts: 12430,
    activeInfluencers: 214,
    topInfluencer: '@dimsum_politik',
    highestEngagement: '@suara_rakyat',
    mostActive: '@kampus_bergerak',
    estimatedReach: '8.4M',
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

        {/* Influencer snapshot */}
        <section>
          <InfluencerSnapshot metrics={snapshotMetrics} />
        </section>

        {/* Role classification */}
        <section className="w-full">
          <RoleClassification />
        </section>

        {/* Ranking table */}
        <section className="w-full">
          <InfluencerRankingTable />
        </section>
      </div>
    </div>
  );
};

export default InfluencerPage;
