import React from 'react';
import { Network, Link, MoveDiagonal, PieChart, Star } from 'lucide-react';

interface SNASnapshotMetrics {
  totalNodes: number;
  totalConnections: number;
  networkDensity: number;
  largestCommunity: string;
  centralNode: string;
}

interface SNASnapshotProps {
  metrics: SNASnapshotMetrics;
}

const SNASnapshot: React.FC<SNASnapshotProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Total Nodes
          </span>
          <Network size={16} className="text-slate-400" />
        </div>
        <div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {metrics.totalNodes.toLocaleString()}
          </span>
          <p className="text-[10px] font-medium text-slate-500 mt-1">
            Unique accounts
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Connections / Edges
          </span>
          <Link size={16} className="text-blue-500" />
        </div>
        <div>
          <span className="text-2xl font-black text-blue-600 tracking-tight">
            {metrics.totalConnections.toLocaleString()}
          </span>
          <p className="text-[10px] font-medium text-slate-500 mt-1">
            Total interactions
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Network Density
          </span>
          <MoveDiagonal size={16} className="text-purple-500" />
        </div>
        <div>
          <span className="text-2xl font-black text-purple-600 tracking-tight">
            {metrics.networkDensity}
          </span>
          <p className="text-[10px] font-medium text-slate-500 mt-1">
            Sparse structure
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Largest Community
          </span>
          <PieChart size={16} className="text-emerald-500" />
        </div>
        <div>
          <span className="text-xl font-black text-emerald-600 tracking-tight block break-all leading-tight">
            {metrics.largestCommunity}
          </span>
          <p className="text-[10px] font-medium text-slate-500 mt-1">
            Main discourse driver
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Central Node
          </span>
          <Star size={16} className="text-amber-500" />
        </div>
        <div>
          <span className="text-xl font-black text-amber-600 tracking-tight truncate block">
            {metrics.centralNode}
          </span>
          <p className="text-[10px] font-medium text-slate-500 mt-1">
            Highest centrality
          </p>
        </div>
      </div>
    </div>
  );
};

export default SNASnapshot;
