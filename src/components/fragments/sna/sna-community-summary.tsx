import React, { useMemo } from 'react';
import type { SNACommunityResult } from '@/types/project';

interface SNACommunitySummaryProps {
  data?: SNACommunityResult | null;
}

const PALETTE = [
  'bg-emerald-500',
  'bg-rose-500',
  'bg-blue-500',
  'bg-amber-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-slate-400',
];

const SNACommunitySummary: React.FC<SNACommunitySummaryProps> = ({ data }) => {
  const clusters = useMemo(() => {
    if (!data || !data.nodes || data.nodes.length === 0) return [];

    const counts: Record<number, number> = {};
    for (const node of data.nodes) {
      counts[node.community] = (counts[node.community] ?? 0) + 1;
    }

    const total = data.nodes.length;
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return sorted.map(([commId, count], idx) => ({
      id: commId,
      name: `Community ${commId}`,
      count,
      sizePercentage: Math.round((count / total) * 100),
      color: PALETTE[idx % PALETTE.length],
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-6 lg:p-8 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
          Community Clusters
        </h3>
        <p className="text-sm font-medium text-slate-500">
          Breakdown of the network into distinct algorithmic communities based
          on interaction density.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        {clusters.length === 0 ? (
          <p className="text-sm text-slate-500">No community data available.</p>
        ) : (
          clusters.map((cluster) => (
            <div key={cluster.id} className="relative">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full shadow-sm ${cluster.color}`}
                  />
                  <span className="font-bold text-slate-800 text-sm">
                    {cluster.name}
                  </span>
                </div>
                <span className="font-black text-slate-900 text-lg">
                  {cluster.sizePercentage}%
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 mb-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cluster.color}`}
                  style={{ width: `${cluster.sizePercentage}%` }}
                />
              </div>
              <p className="text-[11px] font-medium text-slate-400 text-right">
                {cluster.count} accounts
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SNACommunitySummary;
