import React from 'react';
import { MessageSquareText } from 'lucide-react';

interface ClusterData {
  id: string;
  name: string;
  sizePercentage: number;
  dominantTopic: string;
  color: string;
}

const mockClusters: ClusterData[] = [
  {
    id: 'A',
    name: 'Cluster A',
    sizePercentage: 34,
    dominantTopic: 'Kebijakan Publik & Anggaran',
    color: 'bg-emerald-500',
  },
  {
    id: 'B',
    name: 'Cluster B',
    sizePercentage: 22,
    dominantTopic: 'Aksi Protes & Mahasiswa',
    color: 'bg-rose-500',
  },
  {
    id: 'C',
    name: 'Cluster C',
    sizePercentage: 15,
    dominantTopic: 'Ekonomi Kerakyatan',
    color: 'bg-blue-500',
  },
  {
    id: 'D',
    name: 'Cluster D',
    sizePercentage: 11,
    dominantTopic: 'Humor & Sarkasme Politik',
    color: 'bg-amber-500',
  },
  {
    id: 'E',
    name: 'Cluster E',
    sizePercentage: 18,
    dominantTopic: 'Lainnya (Sparse)',
    color: 'bg-slate-400',
  },
];

const SNACommunitySummary: React.FC = () => {
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
        {mockClusters.map((cluster) => (
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

            <div className="w-full bg-slate-100 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${cluster.color}`}
                style={{ width: `${cluster.sizePercentage}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-slate-50 w-max px-2.5 py-1 rounded-md border border-slate-100">
              <MessageSquareText size={12} className="text-slate-400" />
              {cluster.dominantTopic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SNACommunitySummary;
