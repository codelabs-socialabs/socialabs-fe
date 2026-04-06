import React from 'react';
import { Users, UserCheck, Star, Activity, Zap, Radio } from 'lucide-react';

interface SnapshotMetrics {
  totalAccounts: number;
  activeInfluencers: number;
  topInfluencer: string;
  highestEngagement: string;
  mostActive: string;
  estimatedReach: string;
}

interface InfluencerSnapshotProps {
  metrics: SnapshotMetrics;
}

const InfluencerSnapshot: React.FC<InfluencerSnapshotProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Total Unique Accounts
          </span>
          <Users size={16} className="text-slate-400" />
        </div>
        <div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            {metrics.totalAccounts.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Active Influencers
          </span>
          <UserCheck size={16} className="text-blue-500" />
        </div>
        <div>
          <span className="text-2xl font-black text-blue-600 tracking-tight">
            {metrics.activeInfluencers.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Top Influencer
          </span>
          <Star size={16} className="text-amber-500" />
        </div>
        <div>
          <span className="text-lg font-black text-amber-600 tracking-tight break-all leading-tight">
            {metrics.topInfluencer}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Highest Engagement
          </span>
          <Activity size={16} className="text-emerald-500" />
        </div>
        <div>
          <span className="text-lg font-black text-emerald-600 tracking-tight break-all leading-tight">
            {metrics.highestEngagement}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Most Active
          </span>
          <Zap size={16} className="text-orange-500" />
        </div>
        <div>
          <span className="text-lg font-black text-orange-600 tracking-tight break-all leading-tight">
            {metrics.mostActive}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
            Est. Reach
          </span>
          <Radio size={16} className="text-purple-500" />
        </div>
        <div>
          <span className="text-2xl font-black text-purple-600 tracking-tight">
            {metrics.estimatedReach}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InfluencerSnapshot;
