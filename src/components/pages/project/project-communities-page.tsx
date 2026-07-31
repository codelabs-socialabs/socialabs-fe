import { Download, Share2 } from 'lucide-react';

import SNACentralNode from '@/components/fragments/sna/sna-central-node';
import SNACommunitySummary from '@/components/fragments/sna/sna-community-summary';
import SNAConversation from '@/components/fragments/sna/sna-conversation';
import SNANetworkGraph from '@/components/fragments/sna/sna-nework-grap';
import SNASnapshot from '@/components/fragments/sna/sna-snapshot';

const SNAPage = () => {
  const snapshotMetrics = {
    totalNodes: 12430,
    totalConnections: 28115,
    networkDensity: 0.018,
    largestCommunity: 'Cluster A (34%)',
    centralNode: '@dimsum_politik',
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

        {/* Network snapshot */}
        <section>
          <SNASnapshot metrics={snapshotMetrics} />
        </section>

        {/* Graph and community summary */}
        <section className="grid grid-cols-1 items-start gap-6 xl:grid-cols-4">
          <div className="min-w-0 xl:col-span-3">
            <SNANetworkGraph />
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
      </div>
    </div>
  );
};

export default SNAPage;
